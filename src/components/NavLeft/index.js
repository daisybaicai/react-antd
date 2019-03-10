import React, { Component } from 'react'
import './index.less'
import { Menu } from 'antd';
import MenuList from '../../config/menuConfig'
import { NavLink } from 'react-router-dom'
const SubMenu = Menu.SubMenu;
class NavLeft extends Component {
    // componentWillMount() {
    //     const menuTree = this.renderMenu(MenuList)
    //     console.log(MenuList)
    //     this.setState({
    //         menuTree
    //     })
    // }
    renderMenu = (data) => {
        return(
            data.map((item) => {
                if (item.children) {
                    return (
                        <SubMenu key={item.key} title={item.title}>
                            {this.renderMenu(item.children)}
                        </SubMenu>
                    )
                }
                return <Menu.Item key={item.key}><NavLink to={item.key}>{item.title}</NavLink></Menu.Item>
            })
        )
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <img  alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                    <h1 >后台管理系统</h1>
                </div> 
                <div>
                    <Menu  style={{ width: 256 }} mode="vertical">
                        {this.renderMenu(MenuList)}
                    </Menu>
                </div>
            </div>
        )
    }
}

export default NavLeft
import React, {Component} from 'react'
import { Table, Card, Button, Form, Icon, Input, Tree, Modal, Select } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils'
import menuConfig from '../../config/menuConfig'
const {Option} = Select
const { TreeNode } = Tree;
class Permission extends Component {
    state= {
        isRoleVisible: false
    }
    componentDidMount() {
        this.requestData()
    }
    requestData = ()=> {
        axios.ajax({
            url: '/role/list',
            data: {
                params: {}
            }
        }).then((res)=>{
            if(res.code === 0) {
                console.log(res.data)
                let list = res.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                })
                console.log(res)
                this.setState({
                    list
                })
            }
        })
    }
    columns = [
        {
            title: '角色ID',
            dataIndex: 'id'
        }, {
            title: '角色名称',
            dataIndex: 'role_name'
        },{
            title: '创建时间',
            dataIndex: 'create_time',
            render: Utils.formatTime
        }, {
            title: '使用状态',
            dataIndex: 'status',
            render(status){
                if (status === 1) {
                    return "启用"
                } else {
                    return "停用"
                }
            }
        }, {
            title: '授权时间',
            dataIndex: 'authorize_time',
            render: Utils.formatTime
        }, {
            title: '授权人',
            dataIndex: 'authorize_user_name',
        }
    ]
    // 角色创建
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }
    // 角色创建-异步操作
    handleCreateRoleSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url: 'role/create',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            if (res) {
                console.log(data)
                this.setState({
                    isRoleVisible: false
                })
                this.requestData();
            }
        })
    }
    CancelRoleSubmit = () => {
        this.setState({
            isRoleVisible: false
        })
    }
    render() {
        // const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            columnTitle: "选择",
            onSelect: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys, selectedRows)
            },
        }
        return ( 
            <div >
                <Card>
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary">设置权限</Button>
                    <Button type="primary">用户授权</Button>
                </Card>
                <Card>
                    <div>
    \                    <Table
                            bordered
                            rowSelection={rowSelection}
                            columns={this.columns}
                            dataSource={this.state.list}
                            pagination={false}
                        />
                        <Modal
                            title="创建角色"
                            visible={this.state.isRoleVisible}
                            width={600}
                            onOk={this.handleCreateRoleSubmit}
                            onCancel={this.CancelRoleSubmit}
                        >
                            <WrappedRoleForm  wrappedComponentRef={(inst) => this.roleForm = inst} />
                        </Modal>
                        <WrappedPermEditForm></WrappedPermEditForm>
                    </div>
                </Card>
            </div>
        )
    }
}

//角色权限
class RoleForm extends Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const {
            getFieldDecorator
        } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 }
        }

        return (
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                <Form.Item label="角色名称" {...formItemLayout}>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入角色名称" />
                    )}
                </Form.Item>
                <Form.Item label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state', {
                            initialValue: 1
                        })(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>
                        )}
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRoleForm = Form.create({ name: 'horizontal_login' })(RoleForm);


// 设置权限
class PermEditForm extends React.Component {
    state = {};
    // 设置选中的节点，通过父组件方法再传递回来
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    };
    renderTreeNodes = (data,key='') => {
        return data.map((item) => {
            let parentKey = key+item.key;
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree">
                        {this.renderTreeNodes(item.children,parentKey)}
                    </TreeNode>
                );
            } else if (item.btnList) {
                return (
                    <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree">
                        { this.renderBtnTreedNode(item,parentKey) }
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    };

    renderBtnTreedNode = (menu,parentKey='')=> {
        const btnTreeNode = []
        menu.btnList.forEach((item)=> {
            console.log(parentKey+'-btn-'+item.key);
            btnTreeNode.push(<TreeNode title={item.title} key={parentKey+'-btn-'+item.key} className="op-role-tree"/>);
        })
        return btnTreeNode;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18}
        };
        // const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        return (
            <Form layout="horizontal">
                <Form.Item label="角色名称" {...formItemLayout}>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input type="text" placeholder="请输入角色名称" />
                    )}
                </Form.Item>
                <Form.Item label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state', {
                            initialValue: 1
                        })(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>
                        )}
                </Form.Item>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>this.onCheck(checkedKeys)}
                    checkedKeys={menuInfo ||[]}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
const WrappedPermEditForm = Form.create({ name: 'horizontal_permEditForm' })(PermEditForm);

export default Permission
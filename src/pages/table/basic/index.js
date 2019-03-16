import React, { Component } from 'react'
import { Card } from 'antd'
import { Table } from 'antd';
import axios from 'axios'
import './index.less'
import utils from '../../../utils/utils';

class Basic extends Component {
    state = {
        selectedRowKeys: [],
        setItem: []
    };
    componentDidMount(){
        this.request()
        console.log(this.state.mockData)
    }
    request = () => {
        let baseUrl = 'https://www.easy-mock.com/mock/5c84ba14cfb6692c29516334/mockapi'
        axios.get(baseUrl+'/table/list').then((res) => {
            if (res.data.code === 0 && res.status === 200){
                this.setState({
                    mockData: res.data.result.list,
                    pagination: utils.pagination(res.data,(page)=>{
                        console.log(page);
                        this.mockPagination(page)
                    })
                })
            }
        })
    }
    mockPagination = (page) => {
        let baseUrl = 'https://www.easy-mock.com/mock/5c84ba14cfb6692c29516334/mockapi'
        axios.post(baseUrl + `/table/list2?page=${page}`).then((res) => {
            if (res.data.code === 0 && res.status === 200) {
                this.setState({
                    mockData: res.data.result.list,
                    pagination: utils.pagination(res.data, (cur) => {
                        this.mockPagination(cur)
                    })
                })
            }
        })
    }
    columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Sex',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        }, 
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Province',
            dataIndex: 'province',
            key: 'province',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        }, 
        {
            title: 'County',
            dataIndex: 'county',
            key: 'county',
        }];
    data = [{
            "id": 1,
            "username": "贺平",
            "sex": 1,
            "state": 4,
            "date": "1995-05-16",
            "email": "y.xrxtmkllvw@mowwvimw.aq",
            "city": "新界",
            "province": "河南省",
            "county": "乌尔禾区"
        },
        {
            "id": 2,
            "username": "程静",
            "sex": 1,
            "state": 2,
            "date": "1971-07-30",
            "email": "x.gsliyv@aifexoil.lk",
            "city": "新界",
            "province": "江西省",
            "county": "滨海新区"
        },
        {
            "id": 3,
            "username": "蔡桂英",
            "sex": 1,
            "state": 4,
            "date": "1992-02-28",
            "email": "a.eeygwqnv@pirwle.bd",
            "city": "拉萨市",
            "province": "福建省",
            "county": "渝中区"
        }];
    onChange =(selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
    onRowClick = (record, index) => {
        console.log(record, index)
        let selectKey = index
        this.setState({
            selectedRowKeys: selectKey,
            setItem: record
        })
    }
    render() {
        // const { selectedRowKeys} = this.state;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
            // type: 'checkbox',
            // selectedRowKeys,
            // onChange: (selectedRowKeys, selectedRows) => {
            //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            // },
        };
        return (
            <div>
                <Card
                    title="基础表格"
                >
                    <Table columns={this.columns} dataSource={this.data} />
                </Card>
                <Card
                    title="高级表格"
                >
                    <Table columns={this.columns} dataSource={this.state.mockData} />
                </Card>
                <Card
                    title="选项表格"
                >
                    <Table
                        onRow={(record,index) => {
                            return {
                                onClick: () => {this.onRowClick(record,index)}
                            };
                        }}
                        rowSelection={rowSelection} columns={this.columns} dataSource={this.state.mockData} />
                </Card>
                <Card
                    title="表格分页"
                >
                    <Table
                        columns={this.columns} dataSource={this.state.mockData} pagination={this.state.pagination} />
                </Card>
            </div>
        )
    }
}

export default Basic
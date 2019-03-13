import React,{Component} from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartsTheme from './echartsTheme'
import echarts from 'echarts';
class Bar extends Component {

    state={}

    componentWillMount(){
        echarts.registerTheme('theme', echartsTheme);
    }

    option = {
        title: {
            text: '示例'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    option2 = {
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                ['product', '2015', '2016', '2017'],
                ['Matcha Latte', 43.3, 85.8, 93.7],
                ['Milk Tea', 83.1, 73.4, 55.1],
                ['Cheese Cocoa', 86.4, 65.2, 82.5],
                ['Walnut Brownie', 72.4, 53.9, 39.1]
            ]
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{
                type: 'bar'
            },
            {
                type: 'bar'
            },
            {
                type: 'bar'
            }
        ]
    };


    render(){
        return (
            <div>
                <Card title="柱形图表之一">
                    <ReactEcharts option={this.option} theme="theme" notMerge={true} lazyUpdate={true} style={{ height: 500 }}></ReactEcharts>
                </Card>
                <Card title="柱形图表之二" style={{marginTop:10}}>
                    <ReactEcharts option={this.option2}  theme="theme" notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
                </Card>
            </div> 
        );
    }
}

export default Bar
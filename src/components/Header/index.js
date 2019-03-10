import React, { Component } from 'react'
import { Row, Col } from 'antd';
import Util from '../../utils/utils'
import Axios from '../../axios'
import './index.less'
import axios from 'axios'
class Header extends Component {
    state={}
    componentWillMount() {
        setInterval(()=> {
            let nowtime = Util.formateDate(new Date());
            this.setState({
                nowtime: nowtime
            })
        },1000)
        this.getWeatherAPIData()
    }
    getWeatherAPIData() {
        //杭州
        let citycode = "101210101"
        let url =`http://t.weather.sojson.com/api/weather/city/${citycode}`
        // Axios.jsonp({
        //     url: url
        // }).then((res) => {
        //     console.log(res)
        //     if (res.status === 200) {
        //         let data = res.data.data.forecast[0].type;
        //         this.setState({
        //             dayWeather: data
        //         })
        //     }
        // })
        axios.get(url).then((res) => {
            if (res.status === 200) {
                let data = res.data.data.forecast[0].type;
                this.setState({
                    dayWeather: data
                })
            }
        })
    }
    render() {
        return (
            <div className="header">
                <Row className="top">
                    <Col span={24}>
                        <span>你好，XXX</span>
                        <span>退出</span>
                    </Col>
                </Row>
                <Row className="bread">
                    <Col span={4} className="bread-item">
                        首页
                    </Col>
                    <Col span={20} className="weather">
                        {this.state.nowtime}-{this.state.dayWeather}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Header
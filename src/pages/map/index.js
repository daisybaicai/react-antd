import React, {Component} from 'react'
import {Card,Button} from'antd'
import axios from 'axios'
import './index.less'
class Map extends Component {
    state = {a:1}
    map = {}
    componentDidMount() {
        this.renderMap()
        this.getMapData()
    }

    renderMap = () => {
        const { BMap } = window
        this.map = new BMap.Map("baiduMap"); // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
        this.addMapControl()
    }
    // 添加地图控件
    addMapControl = () => {
        const { BMap } = window
        let map = this.map;
        //添加比例尺
        var control = new BMap.ScaleControl();
        var navigation = new BMap.NavigationControl();
        //添加控件和比例尺
        map.addControl(control);
        map.addControl(navigation);
        map.enableScrollWheelZoom(true);
    };
 
    getMapData = () => {
        let baseUrl = 'https://www.easy-mock.com/mock/5c84ba14cfb6692c29516334/mockapi'
        axios.get(baseUrl+'/map/bike').then((res) => {
            if(res.data.code === 0 && res.status === 200) {
                this.setState({
                    res: res.data.result
                })
            }
        })
    }
    renderRouter = (res) => {
        const { BMap } = window
        let list = res.route_list;
        let gps1 = list[0].split(',');
        let startPoint = new BMap.Point(gps1[0], gps1[1]);
        let gps2 = list[list.length - 1].split(',');
        let endPoint = new BMap.Point(gps2[0], gps2[1]);

        this.map.centerAndZoom(endPoint, 11);

        //添加起始图标
        let startPointIcon = new BMap.Icon("/assets/start_point.png", new BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42),
            anchor: new BMap.Size(18, 42)
        });
        
        var bikeMarkerStart = new BMap.Marker(startPoint, { icon: startPointIcon });
        this.map.addOverlay(bikeMarkerStart);

        let endPointIcon = new BMap.Icon("/assets/end_point.png", new BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42),
            anchor: new BMap.Size(18, 42)
        });
        var bikeMarkerEnd = new BMap.Marker(endPoint, { icon: endPointIcon });
        this.map.addOverlay(bikeMarkerEnd);

        let routeList = [];
        list.forEach((item)=>{
            let p = item.split(",");
            let point = new BMap.Point(p[0], p[1]);
            routeList.push(point);
        })
        // 行驶路线
        var polyLine = new BMap.Polyline(routeList, {
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyLine);
    }
    renderServiceList= (res) => {
        const { BMap } = window
        // 服务区路线
        let serviceList = res.service_list;
        let servicePointist = [];
        serviceList.forEach((item) => {
            let point = new BMap.Point(item.lon, item.lat);
            servicePointist.push(point);
        })
        // 画线
        var polyServiceLine = new BMap.Polyline(servicePointist, {
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyServiceLine);
    }
    renderBike = (res) => {
        const { BMap } = window
        // 添加地图中的自行车
        let bikeList = res.bike_list;
        let bikeIcon = new BMap.Icon("/assets/bike.jpg", new BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42),
            anchor: new BMap.Size(18, 42)
        });
        bikeList.forEach((item) => {
            let p = item.split(",");
            let point = new BMap.Point(p[0], p[1]);
            var bikeMarker = new BMap.Marker(point, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        })
    }
    clearOverlays = () => {
		this.map.clearOverlays();
    }
    driveRouter = (res) => {
        const { BMap } = window
        var myP1 = new BMap.Point(116.380967, 39.913285); //起点
        var myP2 = new BMap.Point(116.424374, 39.914668); //终点
        var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/Mario.png", new BMap.Size(32, 70), { //小车图片
            //offset: new BMap.Size(0, -5),    //相当于CSS精灵
            imageOffset: new BMap.Size(0, 0) //图片的偏移量。为了是图片底部中心对准坐标点。
        });
        var driving2 = new BMap.DrivingRoute(this.map, {
            renderOptions: {
                map: this.map,
                autoViewport: true
            }
        }); //驾车实例
        driving2.search(myP1, myP2); //显示一条公交线路

        let that = this

        function run() {
            const { BMap } = window
            var driving = new BMap.DrivingRoute(that.map); //驾车实例
            driving.search(myP1, myP2);
            driving.setSearchCompleteCallback(function () {
                var pts = driving.getResults().getPlan(0).getRoute(0).getPath(); //通过驾车实例，获得一系列点的数组
                var paths = pts.length; //获得有几个点

                var carMk = new BMap.Marker(pts[0], {
                    icon: myIcon
                });
                that.map.addOverlay(carMk);
            
                function resetMkPoint(i) {
                    carMk.setPosition(pts[i]);
                    if (i < paths) {
                        setTimeout(function () {
                            i++;
                            resetMkPoint(i);
                        }, 100);
                    }
                }
                setTimeout(function () {
                    resetMkPoint(5);
                }, 100)

            });
        }

        setTimeout(function () {
            run()
        }, 1500);
    }
    render() {
        return (
            <Card title="百度地图使用">
                <div id="baiduMap" style={{height:500}}></div>
                <Button id = "oneRoute" onClick={this.renderRouter.bind(this,this.state.res)}> 一条路线 </Button>
                <Button id = "serviceList" onClick={this.renderServiceList.bind(this,this.state.res)}> 服务区 </Button>
                <Button id = "drawBike" onClick={this.renderBike.bind(this,this.state.res)}> 覆盖点(bike) </Button>
                <Button id = "driveRouter" onClick={this.driveRouter.bind(this,this.state.res)}>驾驶</Button>
                <Button id = "clear" onClick={this.clearOverlays}>清空所有覆盖</Button>
            </Card>
        );
    }
}

export default Map
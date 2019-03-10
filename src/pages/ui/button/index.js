import React, { Component } from 'react'
import './index.less'
import { Card, Button, Icon } from 'antd'
const ButtonGroup = Button.Group;
class mButton extends Component {
    render() {
        return (
            <div className="Button">
                <Card
                    title="基础按钮"
                >
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                </Card>
                <Card
                    title="图形按钮"
                >
                    <Button type="primary" shape="circle" icon="search" />
                    <Button type="primary" icon="search">Search</Button>
                    <Button shape="circle" icon="search" />
                    <Button icon="search">Search</Button>
                </Card>
                <Card
                    title="前后按钮"
                >
                    <h4>With Icon</h4>
                    <ButtonGroup>
                        <Button type="primary">
                            <Icon type="left" />Go back
                        </Button>
                        <Button type="primary">
                            Go forward<Icon type="right" />
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button type="primary" icon="cloud" />
                        <Button type="primary" icon="cloud-download" />
                    </ButtonGroup>
                </Card>
            </div>
        )
    }
}

export default mButton
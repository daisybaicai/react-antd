import React, { Component } from 'react'
import { HashRouter, Route, Switch} from 'react-router-dom'
import App from './App';
import Login from './pages/login'
import Home from './pages/home'
import Admin from './admin';
import mButton from './pages/ui/button';
import mModals from './pages/ui/modals';
import noMatch from './pages/noMatch';
import Basic from './pages/table/basic';
import Map from './pages/map';
class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={()=> 
                        <Admin>
                            <Switch>
                                <Route exact path="/home" component={Home} />
                                <Route exact path="/ui/buttons" component={mButton} />
                                <Route exact path="/ui/modals" component={mModals} />
                                <Route exact path="/table/basic" component={Basic} />
                                <Route exact path="/bikeMap" component={Map} />
                                <Route exact component={noMatch} />
                            </Switch>
                        </Admin>
                    } />
                    <Route path="/order/detail" component={Login} />
                </App>
            </HashRouter>
        )
    }
}

export default IRouter
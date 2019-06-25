import React, {Component} from 'react';
import { View, AsyncStorage } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Home from './components/home'
import NewTask from './components/new_task'

import Data from './tasks.json'

import {connect} from 'react-redux';
import { getTasks } from './actions';

class Main extends Component {

    componentDidMount() {
        var _this = this;
        //Check if any data exist
        AsyncStorage.getItem('data', (err, data) => {
            //if it doesn't exist, extract from json file
            //save the initial data in Async
            if (data === null){
                AsyncStorage.setItem('data', JSON.stringify(Data.tasks));
                _this.props.getTasks();
            }
        });
    }

    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="home" component={Home} title="Home" initial/>
                    <Scene key="new_task" component={NewTask} title="New TASK"/>
                </Scene>
            </Router>
        );
    }
}

//Connect everything
export default connect(null, { getTasks })(Main);
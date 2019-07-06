
import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Text, TextInput, TouchableOpacity} from 'react-native';

import { connect } from 'react-redux';
import { addTask, updateTask } from '../actions'
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

class NewTask extends Component {

    constructor(props) {
        super(props);

        this.state = {
            task: (props.edit) ? props.task.task : ""
        };

        this.generateID = this.generateID.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    generateID() {
        let d = new Date().getTime();
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });
        
        return id;
    }

    addTask() {
        if (this.props.edit){
            let task = this.props.task;
            task['task'] = this.state.task;
            this.props.updateTask(task);
        }else{
            let id = this.generateID();
            let task = {"id": id,"task": this.state.task};
            this.props.addTask(task);
        }

        Actions.pop();
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{flex:1, paddingLeft:10, paddingRight:10}}>
                    <TextInput
                        multiline={true}
                        onChangeText={(text) => this.setState({task: text})}
                        placeholder={"Enter Task"}
                        style={[styles.task]}
                        value={this.state.task} 
                    /> 
                </View>
                <TouchableOpacity style={[styles.saveBtn]}
                                  disabled={(this.state.task.length > 0) ? false : true}
                                  onPress={this.addTask}>
                    <Text style={[styles.buttonText,
                        {
                            color: (this.state.task.length > 0) ? "#FFF" : "rgba(255,255,255,.5)"
                        }]}>
                        Save
                    </Text>
                </TouchableOpacity>
                <KeyboardSpacer />
            </View>
        );
    }

}

//Connect everything
export default connect(null, {addTask, updateTask})(NewTask);

var styles = StyleSheet.create({
    saveBtn:{
        width: windowWidth,
        height: 44,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:"#86BC25"
    },

    buttonText:{
        backgroundColor:"#86BC25",
        fontWeight: "500",
    },

    task: {
        fontSize: 17,
        lineHeight: 38,
        fontFamily: 'Helvetica Neue',
        color: "#333333",
        padding: 16,
        paddingLeft:0,
        flex:1,
        height: 200,
        marginBottom:50,
        borderTopWidth: 1,
        borderColor: "rgba(212,211,211, 0.3)",
    },

    title: {
        fontWeight: "400",
        lineHeight: 22,
        fontSize: 16,
        fontFamily: 'Helvetica Neue',
        height:25+32,
        padding: 16,
        paddingLeft:0
    },
});

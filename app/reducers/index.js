
import { combineReducers } from 'redux';

import { TASKS_AVAILABLE, ADD_TASK, UPDATE_TASK, DELETE_TASK } from "../actions/" //Import the actions types constant we defined in our actions

let dataState = { tasks: [], loading:true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case ADD_TASK:{
            let tasks =  cloneObject(state.tasks) //clone the current state
            tasks.unshift(action.task); //add the new task to the top
            state = Object.assign({}, state, { tasks: tasks});
            return state;
        }

        case TASKS_AVAILABLE:
            state = Object.assign({}, state, { tasks: action.tasks, loading:false });
            return state;

        case UPDATE_TASK:{
            let task = action.task;
            let tasks =  cloneObject(state.tasks) //clone the current state
            let index = getIndex(tasks, task.id); //find the index of the task with the task id passed
            if (index !== -1) {
                tasks[index]['text'] = task.text;
            }
            state = Object.assign({}, state, { tasks: tasks});
            return state;
        }

        case DELETE_TASK:{
            let tasks =  cloneObject(state.tasks) //clone the current state
            let index = getIndex(tasks, action.id); //find the index of the task with the id passed
            if(index !== -1) tasks.splice(index, 1);//if yes, undo, remove the TASK
            state = Object.assign({}, state, { tasks: tasks});
            return state;
        }

        default:
            return state;
    }
};


function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
})

export default rootReducer;

import { combineReducers } from 'redux';

import { QUOTES_AVAILABLE, ADD_QUOTE, UPDATE_QUOTE, DELETE_QUOTE } from "../actions/" //Import the actions types constant we defined in our actions

let dataState = { quotes: [], loading:true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case ADD_QUOTE:{
            let quotes =  cloneObject(state.quotes) //clone the current state
            quotes.unshift(action.task); //add the new task to the top
            state = Object.assign({}, state, { quotes: quotes});
            return state;
        }

        case QUOTES_AVAILABLE:
            state = Object.assign({}, state, { quotes: action.quotes, loading:false });
            return state;

        case UPDATE_QUOTE:{
            let task = action.task;
            let quotes =  cloneObject(state.quotes) //clone the current state
            let index = getIndex(quotes, task.id); //find the index of the task with the task id passed
            if (index !== -1) {
                quotes[index]['author'] = task.author;
                quotes[index]['text'] = task.text;
            }
            state = Object.assign({}, state, { quotes: quotes});
            return state;
        }

        case DELETE_QUOTE:{
            let quotes =  cloneObject(state.quotes) //clone the current state
            let index = getIndex(quotes, action.id); //find the index of the task with the id passed
            if(index !== -1) quotes.splice(index, 1);//if yes, undo, remove the TASK
            state = Object.assign({}, state, { quotes: quotes});
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
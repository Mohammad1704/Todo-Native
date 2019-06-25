
export const QUOTES_AVAILABLE = 'QUOTES_AVAILABLE';
export const ADD_QUOTE = 'ADD_QUOTE';
export const UPDATE_QUOTE = 'UPDATE_QUOTE';
export const DELETE_QUOTE = 'DELETE_QUOTE';

import {AsyncStorage} from "react-native";


// Add Task - CREATE (C)
export function addTask(task){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                quotes = JSON.parse(quotes);
                quotes.unshift(task); //add the new task to the top
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type: ADD_QUOTE, task:task});
                });
            }
        });
    };
}

// Get Data - READ (R)
export function getTasks(){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                dispatch({type: QUOTES_AVAILABLE, quotes:JSON.parse(quotes)});
            }
        });
    };
}

// Update Task - UPDATE (U)
export function updateTask(task){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                quotes = JSON.parse(quotes);
                var index = getIndex(quotes, task.id); //find the index of the task with the id passed
                if (index !== -1) {
                    quotes[index]['author'] = task.author;
                    quotes[index]['task'] = task.task;
                }
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type: UPDATE_QUOTE, task:task});
                });
            }
        });
    };
}

// Delete Task - DELETE (D)
export function deleteTask(id){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                quotes = JSON.parse(quotes);

                var index = getIndex(quotes, id); //find the index of the task with the id passed
                if(index !== -1) quotes.splice(index, 1);//if yes, undo, remove the TASK
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type: DELETE_QUOTE, id:id});
                });
            }
        });
    };
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}
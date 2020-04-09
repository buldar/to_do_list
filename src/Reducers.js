import {api} from "./api";

export const ADD_TODOLIST = 'Todolist/Reducer/ADD-TODOLIST';
export const ADD_TASK = 'Todolist/ReducerADD-TASK';
export const CHANGE_TASK_TITLE = 'Todolist/ReducerCHANGE-TASK-TITLE';
export const DEL_TODOLIST = 'Todolist/ReducerDEL-TODOLIST';
export const DEL_TASK = 'Todolist/ReducerDEL-TASK';
export const SET_TODOLISTS = 'SET-TODOLISTS';
export const SET_TASKS = 'SET-TASKS'

const addTodolistCreator = (newToDoList) => ({type: ADD_TODOLIST, newToDoList})
const addTaskCreator = (newTask, todolistId) => ({type: ADD_TASK, newTask, todolistId})
const changeTaskCreator = (taskId, obj, todolistId) => ({type: CHANGE_TASK_TITLE, taskId, obj, todolistId})
const delTodolistCreator = (todolistId) => ({type: DEL_TODOLIST, todolistId})
const delTaskCreator = (todolistId, taskId) => ({type: DEL_TASK, todolistId, taskId})
const setTodolistsCreator = (todolists) => ({type: SET_TODOLISTS, todolists})
const setTasksCreator = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId})

export const loadTodolistsThunk = (dispatch) => {
    api.loadTodolists()
        .then(res => {
            dispatch(setTodolistsCreator(res.data))
        });
}
export const loadTasksThunkCreator = (todolistId) => {
    return (dispatch) => {
        api.loadTasks(todolistId)
            .then(res => {
                dispatch(setTasksCreator(res.data.items, todolistId));
            });
    }
}
export const addTodolistThunkCreator = (item) => {
    return (dispatch) => {
        api.addTodolist(item)
            .then(res => {
                dispatch(addTodolistCreator(res.data.data.item));
            });
    }
}
export const delTodolistThunkCreator = (todolistId) => {
    return (dispatch) => {
        api.delTodolist(todolistId)
            .then(res => {
                dispatch(delTodolistCreator(todolistId));
            });
    }
}
export const changeTaskThunkCreator = (task, obj, todolistId) => {
    return (dispatch) => {
        api.changeTask(task, obj, todolistId)
            .then(res => {
                dispatch(changeTaskCreator(task.id, obj, todolistId))
            });
    }
}
export const addTaskThunkCreator = (newText, todolistId) => {
    return (dispatch) => {
        api.addTask(newText, todolistId)
            .then(res => {

                dispatch(addTaskCreator(res.data.data.item, todolistId));

            });
    }
}
export const delTaskThunkCreator = (todolistId, taskId) => {
    return (dispatch) => {
        api.deltask(todolistId, taskId)
            .then(res => {
                dispatch(delTaskCreator(todolistId, taskId));
            });
    }
}

const initialState = {
    todolists: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET-TASKS":
            return {
                ...state,
                todolists: state.todolists.map(x => {
                        if (x.id != action.todolistId) return x;
                        else return {
                            ...x,
                            tasks: action.tasks
                        }

                    }
                )
            }
        case "SET-TODOLISTS":
            return {
                ...state,
                todolists: action.todolists.map(x => ({...x, tasks: []}))
            }
        case "Todolist/Reducer/ADD-TODOLIST":
            return {
                ...state,
                todolists: [...state.todolists, action.newToDoList]
            }
        case "Todolist/ReducerADD-TASK":
            return {
                ...state,
                todolists: state.todolists.map(x => {
                    if (x.id === action.todolistId) {
                        return {...x, tasks: [...x.tasks, action.newTask]}
                    } else {
                        return x;
                    }
                })
            }
        case "Todolist/ReducerCHANGE-TASK-TITLE":
            return {
                ...state,
                todolists: state.todolists.map(x => {
                    if (x.id === action.todolistId) {
                        return {
                            ...x, tasks: x.tasks.map(x => {
                                if (x.id === action.taskId) {
                                    return {...x, ...action.obj}
                                } else {
                                    return x;
                                }
                            })
                        };
                    } else {
                        return x;
                    }
                })

            }
        case "Todolist/ReducerDEL-TODOLIST":
            return {
                ...state,
                todolists: state.todolists.filter(x => x.id != action.todolistId)
            }
        case "Todolist/ReducerDEL-TASK":
            return {
                ...state, todolists: state.todolists.map(x => {
                    if (x.id === action.todolistId) {
                        return {
                            ...x,
                            tasks: x.tasks.filter(z => z.id != action.taskId)
                        }
                    } else {
                        return x;
                    }
                })
            }

    }
    console.log('reducer: ', action);
    return state;
}

export default reducer;
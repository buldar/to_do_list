import {api} from "./api";
import {TaskType, TodolistType} from "./types/entities";

export const ADD_TODOLIST = 'Todolist/Reducer/ADD-TODOLIST';
export const ADD_TASK = 'Todolist/ReducerADD-TASK';
export const CHANGE_TASK_TITLE = 'Todolist/ReducerCHANGE-TASK-TITLE';
export const DEL_TODOLIST = 'Todolist/ReducerDEL-TODOLIST';
export const DEL_TASK = 'Todolist/ReducerDEL-TASK';
export const SET_TODOLISTS = 'SET-TODOLISTS';
export const SET_TASKS = 'SET-TASKS'

//action creator's types
type ChangeTaskType = {
    type: typeof CHANGE_TASK_TITLE;
    taskId: string;
    obj: any;
    todolistId: string
}
type SetTodolistsType = {
    type: typeof SET_TODOLISTS;
    todolists: Array<TodolistType>
}

type AddTodolistType = {
    type: typeof ADD_TODOLIST;
    newToDoList: TodolistType
}
type AddTaskType = {
    type: typeof ADD_TASK;
    newTask: TaskType;
    todolistId: string;
}
type DelTodolistType = {
    type: typeof DEL_TODOLIST;
    todolistId: string
}
type DelTaskType = {
    type: typeof DEL_TASK;
    todolistId: string;
    taskId: string;
}
type SetTasksType = {
    type: typeof SET_TASKS;
    tasks: Array<TaskType>;
    todolistId: string;
}

type TodoActionType = ChangeTaskType
    | SetTodolistsType
    | AddTodolistType
    | AddTaskType
    | DelTodolistType
    | DelTaskType
    | SetTasksType

type InitialStateType = {
    todolists: Array<TodolistType>;
}

//action creators
const setTodolistsCreator = (todolists: Array<TodolistType>): SetTodolistsType => ({type: SET_TODOLISTS, todolists})
const changeTaskCreator = (taskId: string, obj: any, todolistId: string): ChangeTaskType => ({
    type: CHANGE_TASK_TITLE,
    taskId,
    obj,
    todolistId
})

const addTodolistCreator = (newToDoList: TodolistType): AddTodolistType => ({type: ADD_TODOLIST, newToDoList})
const addTaskCreator = (newTask: TaskType, todolistId: string): AddTaskType => ({type: ADD_TASK, newTask, todolistId})
const delTodolistCreator = (todolistId: string): DelTodolistType => ({type: DEL_TODOLIST, todolistId})
const delTaskCreator = (todolistId: string, taskId: string): DelTaskType => ({type: DEL_TASK, todolistId, taskId})
const setTasksCreator = (tasks: Array<TaskType>, todolistId: string): SetTasksType => ({
    type: SET_TASKS,
    tasks,
    todolistId
})


export const loadTodolistsThunk = (dispatch:any) => {
    api.loadTodolists()
        .then(res => {
            dispatch(setTodolistsCreator(res.data))
        });
}
export const loadTasksThunkCreator = (todolistId:string) => {
    return (dispatch:any) => {
        api.loadTasks(todolistId)
            .then(res => {
                dispatch(setTasksCreator(res.data.items, todolistId));
            });
    }
}
export const addTodolistThunkCreator = (item:string) => {
    return (dispatch:any) => {
        api.addTodolist(item)
            .then(res => {
                dispatch(addTodolistCreator(res.data.data.item));
            });
    }
}
export const delTodolistThunkCreator = (todolistId: string) => {
    return (dispatch:any) => {
        api.delTodolist(todolistId)
            .then(res => {
                dispatch(delTodolistCreator(todolistId));
            });
    }
}
export const changeTaskThunkCreator = (task:TaskType, obj:any, todolistId:string) => {
    return (dispatch:any) => {
        api.changeTask(task, obj, todolistId)
            .then(res => {
                dispatch(changeTaskCreator(task.id, obj, todolistId))
            });
    }
}
export const addTaskThunkCreator = (newText:string, todolistId:string) => {
    return (dispatch:any) => {
        api.addTask(newText, todolistId)
            .then(res => {

                dispatch(addTaskCreator(res.data.data.item, todolistId));

            });
    }
}
export const delTaskThunkCreator = (todolistId:string, taskId:string) => {
    return (dispatch:any) => {
        api.deltask(todolistId, taskId)
            .then(res => {
                dispatch(delTaskCreator(todolistId, taskId));
            });
    }
}


const initialState: InitialStateType = {
    todolists: [],
 }


const reducer = (state = initialState, action:TodoActionType):InitialStateType => {
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
    return state;
}

export default reducer;
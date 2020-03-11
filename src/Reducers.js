export const ADD_TODOLIST = 'Todolist/Reducer/ADD-TODOLIST';
export const ADD_TASK = 'Todolist/ReducerADD-TASK';
export const CHANGE_TASK_TITLE = 'Todolist/ReducerCHANGE-TASK-TITLE';
export const DEL_TODOLIST = 'Todolist/ReducerDEL-TODOLIST';
export const DEL_TASK = 'Todolist/ReducerDEL-TASK';

export const addTodolistCreator = (newToDoList) =>({type:ADD_TODOLIST, newToDoList})
export const addTaskCreator = (newTask, todolistId) =>({type:ADD_TASK, newTask, todolistId})
export const changeTaskCreator = (taskId, obj, todolistId) =>({type:CHANGE_TASK_TITLE, taskId, obj, todolistId})
export const delTodolistCreator = (todolistId) =>({type:DEL_TODOLIST, todolistId})
export const delTasktCreator = (todolistId, taskId) =>({type:DEL_TASK, todolistId, taskId})




const initialState = {
    todolists: [
        {
            "title": "first list", "id": 1, tasks: [
                {id: 1, title: 'dwda', isDone: true, priority: 'low'},
                {id: 2, title: 'dwda', isDone: false, priority: 'medium'}]
        },
        {
            "title": "втрой лист", "id": 2, tasks: [
                {id: 1, title: '234', isDone: false, priority: 'higth'},
                {id: 2, title: '456456', isDone: true, priority: 'low'}]
        },]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
import {createStore} from "redux";

const initialState = {
    todolists: [
        {"title": "first list", "id": 1, tasks:[{id: 1, title: 'dwda', isDone: true, priority: 'low'},{id: 2, title: 'dwda', isDone: false, priority: 'medium'}]},
        {"title": "втрой лист", "id": 2, tasks:[{id: 1, title: '234', isDone: false, priority: 'higth'},{id: 2, title: '456456', isDone: true, priority: 'low'}]},
    ],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return {
                ...state,
                todolists: [...state.todolists, action.newToDoList]
            }
        case "ADD-TASK":
            return {
                ...state,
                todolists: state.todolists.map(x=>{
                    if(x.id === action.todolistId) {
                        return {...x, tasks: [...x.tasks, action.newTask]}
                    } else {
                        return x;
                    }
                })
            }
    }
    console.log('reducer: ', action);
    return state;
}

const store = createStore(reducer);


export default store;
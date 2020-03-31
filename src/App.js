import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TODOLIST, addTodolistCreator, setTodolistsCreator} from "./Reducers";
import axios from "axios";


class App extends React.Component {

    state = {
    }
    nextToDoListId = Math.floor(Math.random()*100);

// test = true;
    addToDoList = (item) => {
        // let newToDoList = {
        //     title: item,
        //     id: this.nextToDoListId,
        //     tasks: []
        // };
        // this.props.addToDoList(newToDoList);
        // this.nextToDoListId++;
        axios.post("https://social-network.samuraijs.com/api/1.0/todo-lists",
            {title: item},
            {withCredentials: true,
            headers: {'API-KEY':'de8c7563-dd18-4912-9001-90e13a939eac'}
            })
            .then(res => {

                debugger
                 this.props.addToDoList(res.data.data.item);
            });

    }


    // saveToStorage = () => {
    //     let stateAsString = JSON.stringify(this.state);
    //     localStorage.setItem('todolists', stateAsString);
    // };


    // loadFromStorage = () => {
    //     let stateAsString = localStorage.getItem('todolists');
    //     if (stateAsString != null) {
    //         let state = JSON.parse(stateAsString);
    //
    //         state.todolists.forEach(x => {
    //             if (x.id >= this.nextToDoListId) {
    //                 this.nextToDoListId = x.id + 1;
    //             }
    //         });
    //         this.setState(state);
    //     }
    // }


    componentDidMount() {
        // this.loadFromStorage();
        // const todolists = [{
        //     'id': 1,
        //     'title': 'first list',
        //     tasks: [
        //         {'title': 'one', 'isDone': true, 'priority': 'low', 'id': 1},
        //         {'title': 'two', 'isDone': false, 'priority': 'medium', 'id': 2},
        //     ]
        // }
        // ]
        axios.get("https://social-network.samuraijs.com/api/1.0/todo-lists",
            {withCredentials: true})
            .then(res => {
                // debugger
                console.log(res.data);
                this.props.setTodolists(res.data);
            });


    }


    render = () => {
        let toDoListsElements = this.props
            .todolists
            .map(x => <ToDoList id={x.id} title={x.title} key={x.id} tasks={x.tasks}/>);

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addToDoList}/>
                </div>
                <div className="App">
                    {toDoListsElements}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToDoList: (newToDoList) => {
            dispatch(addTodolistCreator(newToDoList))
        },
        setTodolists: (todolists) => {
            dispatch(setTodolistsCreator(todolists))
        }
    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

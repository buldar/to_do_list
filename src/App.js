import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TODOLIST, addTodolistCreator} from "./Reducers";
import axios from "axios";


class App extends React.Component {

    state = {
        // todolists: [],
        // test: true,
    }
    nextToDoListId = 3;

// test = true;
    addToDoList = (item) => {
        let newToDoList = {
            title: item,
            id: this.nextToDoListId,
            tasks: []
        };
        this.props.addToDoList(newToDoList);
        this.nextToDoListId++;
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
    restoreState = () => {
        axios.get("https://social-network.samuraijs.com/api/1.0/todo-lists",
            {withCredentials: true})
            .then(res => {
                // debugger
                console.log(res.data);
            });
    }

    componentDidMount() {
        // this.loadFromStorage();
        this.restoreState();
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
            // const action = {
            //     type: ADD_TODOLIST,
            //     newToDoList
            // }
            dispatch(addTodolistCreator(newToDoList))
        }
    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

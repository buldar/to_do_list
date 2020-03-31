import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TODOLIST, addTodolistCreator, setTasksCreator, setTodolistsCreator} from "./Reducers";
import axios from "axios";


class App extends React.Component {

    state = {}
    nextToDoListId = Math.floor(Math.random() * 100);

// test = true;
    addToDoList = (item) => {
        axios.post("https://social-network.samuraijs.com/api/1.0/todo-lists",
            {title: item},
            {
                withCredentials: true,
                headers: {'API-KEY': 'de8c7563-dd18-4912-9001-90e13a939eac'}
            })
            .then(res => {

                this.props.addToDoList(res.data.data.item);
            });

    }
    // restoreState = () => {
    //     axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
    //         {withCredentials: true})
    //         .then(res => {
    //             let allTasks = res.data.items;
    //             this.props.setTasks(allTasks, this.props.id);
    //         });
    // }


    componentDidMount() {
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
        },

    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

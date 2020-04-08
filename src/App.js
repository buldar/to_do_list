import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TODOLIST, addTodolistCreator, setTasksCreator, setTodolistsCreator} from "./Reducers";
import axios from "axios";
import {api} from "./api";


class App extends React.Component {

    state = {}

    addToDoList = (item) => {
        api.addTodolist (item)
            .then(res => {

                this.props.addToDoList(res.data.data.item);
            });

    }

    componentDidMount() {
        api.loadTodolists ()
            .then(res => {
                console.log(res.data);
                this.props.setTodolists(res.data);
            });
    }

    render = () => {
        let toDoListsElements = this.props
            .todolists
            .map(x => <ToDoList  id={x.id} title={x.title} key={x.id} tasks={x.tasks}/>);

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

import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTodolistThunkCreator,
    loadTodolistsThunk,
    setTasksCreator,
    setTodolistsCreator
} from "./Reducers";


class App extends React.Component {

    state = {}

    addToDoList = (item) => {
        this.props.addTodolist(item)
    }

    componentDidMount() {
        this.props.loadTodolists();
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
        loadTodolists: () => {
            dispatch(loadTodolistsThunk)
        },
        addTodolist: (item) =>{
            dispatch(addTodolistThunkCreator(item))
        }

    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

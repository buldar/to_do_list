import React from 'react'
import ToDoListHeader from "./ToDoListHeader";
import ToDoListTask from "./ToDoListTask";
import ToDoListFooter from "./ToDoListFooter";
import {connect} from "react-redux";

class ToDoList extends React.Component {
    state = {
        tasks: [],
        filterValue: 'All',
    };
    nextTaskId = 3;

    addTask = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "medium"
        };
        this.props.addTask(newTask, this.props.id);
        this.nextTaskId++;
    }
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }
    changeCheckAndTitle = (taskId, obj) => {
        this.props.changeTask(taskId, obj, this.props.id)
    }
    changeStatus = (taskId, isDone) => {
        this.changeCheckAndTitle(taskId, {isDone: isDone});
    }
    changeTask = (taskId, title) => {
        this.changeCheckAndTitle(taskId, {title: title})
    }
    saveToStorage = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state' + this.props.id, stateAsString);
    };
    loadFromStorage = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        };
        let stateAsString = localStorage.getItem('our-state' + this.props.id);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state);
        this.nextTaskId = state.tasks.length + 1;
    }

    componentDidMount() {
        this.loadFromStorage();
    }

    delToDoList = () => {
        this.props.delToDoList(this.props.id);
    }

    render() {
        return (
            <div className="todoList">
                <ToDoListHeader onClick={this.addTask} onTitle={this.newTaskTitle} title={this.props.title}/>
                <div><button onClick = {this.delToDoList}>x</button></div>
                <ToDoListTask
                    tlId ={this.props.id}
                    changeTask={this.changeTask}
                    changeStatus={this.changeStatus}
                    atributForTasks={this.props.tasks.filter(t => {
                        switch (this.state.filterValue) {
                            case 'All':
                                return true;
                                break;
                            case 'Completed':
                                return t.isDone === true;
                                break;
                            case 'Active':
                                return t.isDone === false;
                                break;
                            default:
                                return true;
                                break;
                        }
                    })
                    }/>
                <ToDoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}
                                inpval={this.newTaskTitle}/>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newTask, todolistId) => {
            const action = {
                type: 'ADD-TASK',
                newTask,
                todolistId,
            }
            dispatch(action);
        },
        changeTask: (taskId, obj, todolistId) => {
            const action = {
                type: "CHANGE-TASK-TITLE",
                taskId,
                obj,
                todolistId
            }
            dispatch(action);
        },
        delToDoList: (todolistId) => {
            const action = {
                type: "DEL-TODOLIST",
                todolistId
            }
            dispatch(action);
        }
    }
}

const ConnectedApp = connect(null, mapDispatchToProps)(ToDoList);
export default ConnectedApp;
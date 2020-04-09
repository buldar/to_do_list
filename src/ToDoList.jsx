import React from 'react'
import ToDoListHeader from "./ToDoListHeader";
import ToDoListTask from "./ToDoListTask";
import ToDoListFooter from "./ToDoListFooter";
import {connect} from "react-redux";
import {
    addTaskThunkCreator,
    changeTaskThunkCreator, delTodolistThunkCreator, loadTasksThunkCreator
} from "./Reducers";

class ToDoList extends React.Component {
    state = {
        tasks: [],
        filterValue: 'All',
    };

    componentDidMount() {
        this.props.loadTasks(this.props.id)
    }

    addTask = (newText) => {
        this.props.addTask(newText, this.props.id)
    }
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }
    changeCheckAndTitle = (task, obj) => {
        this.props.changeTask(task, obj, this.props.id)
    }
    changeStatus = (task, isDone) => {
        this.changeCheckAndTitle(task, {status: isDone ? 2 : 0});
    }
    changeTask = (task, title) => {
        this.changeCheckAndTitle(task, {title: title})
    }

    delToDoList = () => {
        this.props.delToDolist(this.props.id)
    }

    render() {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <ToDoListHeader onClick={this.addTask} onTitle={this.newTaskTitle} title={this.props.title}/>
                <div>
                    <button onClick={this.delToDoList}>x</button>
                </div>
                <ToDoListTask
                    tlId={this.props.id}
                    changeTask={this.changeTask}
                    changeStatus={this.changeStatus}
                    atributForTasks={/*this.props.*/tasks.filter(t => {
                        switch (this.state.filterValue) {
                            case 'All':
                                return true;
                                break;
                            case 'Completed':
                                return t.status === 2;
                                break;
                            case 'Active':
                                return t.status === 0;
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
            dispatch(addTaskThunkCreator(newTask, todolistId));
        },
        changeTask: (taskId, obj, todolistId) => {
            dispatch(changeTaskThunkCreator(taskId, obj, todolistId));
        },
        delToDolist: (todolistId) => {
            dispatch(delTodolistThunkCreator(todolistId));
        },
        loadTasks: (todolistId) => {
            dispatch(loadTasksThunkCreator(todolistId))
        }

    }
}

const ConnectedApp = connect(null, mapDispatchToProps)(ToDoList);
export default ConnectedApp;
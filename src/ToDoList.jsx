import React from 'react'
import ToDoListHeader from "./ToDoListHeader";
import ToDoListTask from "./ToDoListTask";
import ToDoListFooter from "./ToDoListFooter";
import {connect} from "react-redux";
import {
    addTaskCreator,
    changeTaskCreator,
    delTodolistCreator, setTasksCreator
} from "./Reducers";
import axios from "axios";
import {api} from "./api";

class ToDoList extends React.Component {
    state = {
        tasks: [],
        filterValue: 'All',
    };

    componentDidMount() {
        api.loadTasks(this.props.id)
            .then(res => {
                this.props.setTasks(res.data.items, this.props.id);
            });
    }

    addTask = (newText) => {
        api.addTask(newText, this.props.id)
            .then(res => {

                this.props.addTask(res.data.data.item, this.props.id);

            });
    }
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }
    changeCheckAndTitle = (task, obj) => {
        api.changeTask(task, obj, this.props.id)
            .then(res => {
                this.props.changeTask(task.id, obj, this.props.id)
            });

    }
    changeStatus = (task, isDone) => {
        this.changeCheckAndTitle(task, {status: isDone ? 2 : 0});
    }
    changeTask = (task, title) => {
        this.changeCheckAndTitle(task, {title: title})
    }

    delToDoList = () => {
        api.delTodolist(this.props.id)
            .then(res => {
                this.props.delToDoList(this.props.id);
            });
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
            dispatch(addTaskCreator(newTask, todolistId));
        },
        changeTask: (taskId, obj, todolistId) => {
            dispatch(changeTaskCreator(taskId, obj, todolistId));
        },
        delToDoList: (todolistId) => {
            dispatch(delTodolistCreator(todolistId));
        },
        setTasks: (tasks, todolistId) => {
            dispatch(setTasksCreator(tasks, todolistId))
        },

    }
}

const ConnectedApp = connect(null, mapDispatchToProps)(ToDoList);
export default ConnectedApp;
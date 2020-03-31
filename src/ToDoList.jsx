import React from 'react'
import ToDoListHeader from "./ToDoListHeader";
import ToDoListTask from "./ToDoListTask";
import ToDoListFooter from "./ToDoListFooter";
import {connect} from "react-redux";
import {
    ADD_TASK,
    addTaskCreator,
    CHANGE_TASK_TITLE,
    changeTaskCreator,
    DEL_TODOLIST,
    delTodolistCreator, setTasksCreator
} from "./Reducers";
import axios from "axios";

class ToDoList extends React.Component {
    state = {
        tasks: [],
        filterValue: 'All',
    };

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {withCredentials: true})
            .then(res => {
                this.props.setTasks(res.data.item, this.props.id);
            });


    }

    addTask = (newText) => {
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {title: newText},
            {
                withCredentials: true,
                headers: {'API-KEY': 'de8c7563-dd18-4912-9001-90e13a939eac'}
            })
            .then(res => {

                this.props.addTask(res.data.data.item, this.props.id);

            });
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

    delToDoList = () => {
        axios.delete("https://social-network.samuraijs.com/api/1.0/todo-lists/" + this.props.id,
            {
                withCredentials: true,
                headers: {'API-KEY': 'de8c7563-dd18-4912-9001-90e13a939eac'}
            })
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
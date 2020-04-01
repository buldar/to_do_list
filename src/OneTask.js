import React from 'react';
import {connect} from "react-redux";
import {DEL_TASK, delTasktCreator} from "./Reducers";
import axios from "axios";


class OneTask extends React.Component {
    state = {
        taskisdone: false,
        editmode: false,
    }
    activateEditMode = () => {
        this.setState({
            editmode: !this.state.editmode
        })
    }
    onIsDoneChanged = (e) => {

        this.props.changeStatus(this.props.taskProperties, e.currentTarget.checked)
    }
    changeCurrentTask = (e) => {
        this.props.changeTask(this.props.taskProperties, e.currentTarget.value)
    }

    delTask = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.tlId}/tasks/${this.props.taskProperties.id}`,
            {
                withCredentials: true,
                headers: {'API-KEY': 'de8c7563-dd18-4912-9001-90e13a939eac'}
            })
            .then(res => {


                this.props.delTask(this.props.taskProperties.id, this.props.tlId);
            });
        this.props.delTask(this.props.tlId, this.props.taskProperties.id);
    }

    render = () => {

        let isDone = this.props.taskProperties.status===2;
        let classfordone = (isDone) ? 'todoList-task taskdone' : 'todoList-task';
        return (

            <div className={classfordone}>
                <input type="checkbox" checked={isDone} onChange={this.onIsDoneChanged}/>
                {this.state.editmode
                    ? <input onChange={this.changeCurrentTask} value={this.props.taskProperties.title} autoFocus={true}
                             onBlur={this.activateEditMode}/>
                    : <span
                        onClick={this.activateEditMode}>id:{this.props.taskProperties.id}, {this.props.taskProperties.title},
                        priority: {this.props.taskProperties.priority}</span>}
<button onClick={this.delTask}>x</button>
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        delTask: (todolistId, taskId) => {

            dispatch(delTasktCreator(todolistId, taskId));
        }
    }
}

const ConnectedApp = connect(null, mapDispatchToProps)(OneTask);
export default ConnectedApp;

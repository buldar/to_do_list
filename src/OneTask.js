import React from 'react';
import {connect} from "react-redux";
import {DEL_TASK, delTasktCreator, delTaskThunkCreator} from "./Reducers";
import axios from "axios";
import {api} from "./api";


class OneTask extends React.Component {
    state = {
        taskisdone: false,
        editmode: false,
    }
    activateEditMode = (e) => {
        this.props.changeTask(this.props.taskProperties, e.currentTarget.value)
        this.setState({
            editmode: !this.state.editmode
        })
    }
    onIsDoneChanged = (e) => {

        this.props.changeStatus(this.props.taskProperties, e.currentTarget.checked)
    }
    delTask = () => {
        this.props.delTask(this.props.tlId, this.props.taskProperties.id)
        // api.deltask(this.props.tlId, this.props.taskProperties.id)
        //     .then(res => {
        //
        //
        //         this.props.delTask(this.props.taskProperties.id, this.props.tlId);
        //     });
        // this.props.delTask(this.props.tlId, this.props.taskProperties.id);
    }

    render = () => {

        let isDone = this.props.taskProperties.status === 2;
        let classfordone = (isDone) ? 'todoList-task taskdone' : 'todoList-task';
        return (

            <div className={classfordone}>
                <input type="checkbox" checked={isDone} onChange={this.onIsDoneChanged}/>
                {this.state.editmode
                    ? <input defaultValue={this.props.taskProperties.title} autoFocus={true}
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
            dispatch(delTaskThunkCreator(todolistId, taskId));
        }
    }
}

const ConnectedApp = connect(null, mapDispatchToProps)(OneTask);
export default ConnectedApp;

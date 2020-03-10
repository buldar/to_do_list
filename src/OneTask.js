import React from 'react';
import {connect} from "react-redux";


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
        this.props.changeStatus(this.props.taskProperties.id, e.currentTarget.checked)
    }
    changeCurrentTask = (e) => {
        this.props.changeTask(this.props.taskProperties.id, e.currentTarget.value)
    }

    delTask = () => {
        this.props.delTask(this.props.tlId, this.props.taskProperties.id);
    }

    render = () => {

        let classfordone = (this.props.taskProperties.isDone) ? 'todoList-task taskdone' : 'todoList-task';
        return (

            <div className={classfordone}>
                <input type="checkbox" checked={this.props.taskProperties.isDone} onChange={this.onIsDoneChanged}/>
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
            const action = {
                type: "DEL-TASK",
                todolistId,
                taskId,
            }
            dispatch(action)
        }
    }
}

const ConnectedApp = connect(null, mapDispatchToProps)(OneTask);
export default ConnectedApp;

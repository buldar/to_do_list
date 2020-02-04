import React from 'react';


class OneTask extends React.Component {
    state = {
        taskisdone: false
    }

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.taskProperties, e.currentTarget.checked)
    }

    render = () => {
        let classfordone = (this.props.taskProperties.isDone)? 'todoList-task taskdone': 'todoList-task';
        return (

            <div className={classfordone}>
                <input  type="checkbox" checked={this.props.taskProperties.isDone} onChange={this.onIsDoneChanged}/>
                <span>{this.props.taskProperties.title}, priority: {this.props.taskProperties.priority}</span>
            </div>

        );
    }
}

export default OneTask;


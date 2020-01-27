import React from 'react';


class OneTask extends React.Component {

    onIsDoneChanged = (e) => {
        // alert(e.currentTarget.checked);
        this.props.changeStatus(this.props.taskProperties, e.currentTarget.checked)
    }

    render = () => {
        return (
            <div className="todoList-task">
                <input type="checkbox" checked={this.props.taskProperties.isDone} onChange={this.onIsDoneChanged}/>
                <span>{this.props.taskProperties.title}, priority: {this.props.taskProperties.priority}</span>
            </div>

        );
    }
}

export default OneTask;


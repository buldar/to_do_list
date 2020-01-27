import React from 'react';


class OneTask extends React.Component {

    onIsDoneChanged = (e) => {
        // alert(e.currentTarget.checked);
        this.props.changeStatus(this.props.isDone, e.currentTarget.checked)
    }

    render = () => {
        return (
            <div className="todoList-task">
                <input type="checkbox" checked={this.props.isDone} onChange={this.onIsDoneChanged}/>
                <span>{this.props.title}, priority: {this.props.priority}</span>
            </div>

        );
    }
}

export default OneTask;


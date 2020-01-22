import React from 'react';


class ToDoListHeader extends React.Component {
    render() {
        return (
        <div className="todoList-header">
            <h3 className="todoList-header__title">What to Learn</h3>
            <div className="todoList-newTaskForm">
                <input ref={this.props.onTitle} type="text" placeholder="New task name"/>
                <button onClick={this.props.onClick}>Add</button>
            </div>
        </div>
        );
    }
}

export default ToDoListHeader;


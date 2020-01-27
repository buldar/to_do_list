import React from 'react';
import OneTask from "./OneTask";

class ToDoListTask extends React.Component {


    render = () => {
        let tasksEl = this.props.atributForTasks.map(t => <OneTask
            title={t.title}
            isDone={t.isDone}
            priority={t.priority}
            changeStatus={this.props.changeStatus}/>);

        return (
            <div className="todoList-tasks">
                {tasksEl}
            </div>
        );
    }
}

export default ToDoListTask;


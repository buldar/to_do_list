import React from 'react';
import OneTask from "./OneTask";

class ToDoListTask extends React.Component {


    render = () => {
        let tasksEl = this.props.atributForTasks.map(task => <OneTask
            taskProperties={task}
            changeStatus={this.props.changeStatus}
            changeTask={this.props.changeTask}/>);

        return (
            <div className="todoList-tasks">
                {tasksEl}
            </div>
        );
    }
}

export default ToDoListTask;


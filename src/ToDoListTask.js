import React from 'react';
import OneTask from "./OneTask";

class ToDoListTask extends React.Component {
    render = () => {

        let tasksEl = this.props.atributForTasks.map ((t)=>{
            return <OneTask title={t.title} isDone={t.isDone} priority={t.priority}/>
        });


        return (
                    <div className="todoList-tasks">
                        {tasksEl}

                    </div>
        );
    }
}

export default ToDoListTask;


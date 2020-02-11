import React from 'react';
import './App.css';
import ToDoListHeader from "./ToDoListHeader";
import ToDoListTask from "./ToDoListTask";
import ToDoListFooter from "./ToDoListFooter";


class App extends React.Component {


    state = {
        tasks: [
            {id: 0, title: "JS", isDone: true, priority: "high"},
            {id: 1, title: "CSS", isDone: false, priority: "low"},
            {id: 2, title: "HTML", isDone: true, priority: "low"},
            {id: 3, title: "REACT", isDone: false, priority: "high"}
        ],
        filterValue: 'All',
    };
    nextTaskId = 4;
    addTask = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "medium"
        };
        let newTasks = [...this.state.tasks, newTask];

        this.setState({tasks: newTasks});
        this.nextTaskId++;
    }
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }
    changeStatus = (taskId, isDone) => {
        let newTasks = this.state.tasks.map(t => {
                if (t.id != taskId) {
                    return t;
                } else {
                    return {...t, isDone: isDone};
                }
            }
        );
        this.setState({tasks: newTasks})
    }
    //сомнительная херня
    changeTask = (taskId, title) => {
        let newTasks = this.state.tasks.map(t => {
                if (t.id != taskId) {
                    return t;
                } else {
                    return {...t, title: title};
                }
            }
        );
        this.setState({tasks: newTasks})
    }

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <ToDoListHeader onClick={this.addTask} onTitle={this.newTaskTitle}/>
                    <ToDoListTask
                        changeTask={this.changeTask}
                        changeStatus={this.changeStatus}
                        atributForTasks={this.state.tasks.filter(t => {
                            switch (this.state.filterValue) {
                                case 'All':
                                    return true;
                                    break;
                                case 'Completed':
                                    return t.isDone === true;
                                    break;
                                case 'Active':
                                    return t.isDone === false;
                                    break;
                                default:
                                    return true;
                                    break;
                            }
                        })
                        }/>
                    <ToDoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}
                                    inpval={this.newTaskTitle}/>

                </div>
            </div>
        );
    }
}


export default App;


import React from 'react'
import ToDoListHeader from "./ToDoListHeader";
import ToDoListTask from "./ToDoListTask";
import ToDoListFooter from "./ToDoListFooter";

class ToDoList extends React.Component {
    state = {
        tasks: [],
        filterValue: 'All',
    };
    nextTaskId = 0;

    addTask = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "medium"
        };

        let newTasks = [...this.state.tasks, newTask];

        this.setState({
                tasks: newTasks
            }, () => {this.saveToStorage();}
        );
        this.nextTaskId++;
    }
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }
    changeCheckAndTitle = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
                if (t.id != taskId) {
                    return t;
                } else {
                    return {...t, ...obj};
                }
            }
        );
        this.setState({tasks: newTasks})
    }
    changeStatus = (taskId, isDone) => {
        this.changeCheckAndTitle(taskId, {isDone: isDone});
    }
    changeTask = (taskId, title) => {
        this.changeCheckAndTitle(taskId, {title: title})
    }
    saveToStorage = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state'+this.props.id, stateAsString);
       };
    loadFromStorage = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        };
        let stateAsString = localStorage.getItem('our-state'+this.props.id);
        if (stateAsString!=null) {
            state=JSON.parse(stateAsString);
        }
        this.setState(state);
        this.nextTaskId = state.tasks.length+1;
    }
    componentDidMount() {
        this.loadFromStorage();
    }
    render () {
        return (
            <div className="todoList">
                <ToDoListHeader onClick={this.addTask} onTitle={this.newTaskTitle} title={this.props.title}/>
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
        )
    }
}

export default ToDoList;
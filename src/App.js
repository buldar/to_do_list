import React from 'react';
import './App.css';
import ToDoListHeader from "./ToDoListHeader";
import ToDoListTask from "./ToDoListTask";
import ToDoListFooter from "./ToDoListFooter";


class App extends React.Component {

    constructor(props) {
        super(props);
        // this.newTaskTitle = React.createRef();
    }

    newTaskTitle = React.createRef();
    state = {
        tasks: [
            {title: "JS", isDone: true, priority: "high"},
            {title: "CSS", isDone: false, priority: "low"},
            {title: "HTML", isDone: true, priority: "low"},
            {title: "REACT", isDone: false, priority: "high"}
        ],
        //filterValue : "Complited"
    };

    onAddTaskClick = () => {
        let newText = this.newTaskTitle.current.value;
        let newTask = {
            title: newText,
            isDone: true,
            priority: "medium"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({tasks: newTasks});
        this.newTaskTitle.current.value = "";
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }
    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map(t => {
                if (t != task) {
                    return t;
                } else {
                    return {...t, isDone: isDone};
                }
            }
        );
        this.setState({tasks: newTasks})
    }


    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <ToDoListHeader onClick={this.onAddTaskClick} onTitle={this.newTaskTitle}/>
                    <ToDoListTask
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
                    <ToDoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>

                </div>
            </div>
        );
    }
}


export default App;


import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";


class App extends React.Component {
    state = {
        todolists: [],
    }
    nextToDoListId = 1;

    addToDoList = (item) => {
        let newToDoList = {
            title: item,
            id: this.nextToDoListId,
        };
        // this.setState({
        //         todolists: [...this.state.todolists, newToDoList]
        //     }, () => {
        //         this.saveToStorage();
        //     }
        // )
        this.props.addToDoList(newToDoList);
        this.nextToDoListId++;
    }

    saveToStorage = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('todolists', stateAsString);
    };
    loadFromStorage = () => {
        let stateAsString = localStorage.getItem('todolists');
        if (stateAsString != null) {
            let state = JSON.parse(stateAsString);

            state.todolists.forEach(x => {
                if (x.id >= this.nextToDoListId) {
                    this.nextToDoListId = x.id + 1;
                }
            });
            this.setState(state);
        }
    }

    componentDidMount() {
        this.loadFromStorage();
    }


    render = () => {
        // let toDoListsElements = this.state.todolists.map(x => <ToDoList id={x.id} title={x.title} key={x.id}/>);
        let toDoListsElements = this.props.todolists.map(x => <ToDoList id={x.id} title={x.title} key={x.id} tasks={x.tasks}/>);
        return (
            <div className="App">
                <AddNewItemForm addItem={this.addToDoList}/>
                {toDoListsElements}
            </div>
        );
    }
}
// export default App;

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToDoList: (newToDoList) => {
            const action = {
                type: "ADD-TODOLIST",
                newToDoList: newToDoList
            };
            dispatch(action);
        }
    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

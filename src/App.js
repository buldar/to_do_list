import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";


class App extends React.Component {
    state = {
        todolists: [],
        nextToDoListId: 0,
    }

    addToDoList = (item) => {
        let newToDoList = {
            title: item,
            id: this.nextToDoListId,
        };
        this.setState({
                todolists: [...this.state.todolists, newToDoList]
            }, () => {
                this.saveToStorage();
            }
        )
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


        let toDoListsElements = this.state.todolists.map(x => {return <ToDoList id={x.id} title={x.title} key={x.id}/>});

        return (

            <div className="App">
                <AddNewItemForm addItem={this.addToDoList}/>
                {toDoListsElements}
                {/*<ToDoListHeader/>*/}
                {/*<ToDoList id={1}/>*/}
                {/*<ToDoList id={2}/>*/}
            </div>
        );
    }
}


export default App;


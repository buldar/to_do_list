import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import ToDoListHeader from "./ToDoListHeader";


class App extends React.Component {
    state = {
        todolists: [
            {id: 1, title: '1 to do'},
            {id: 2, title: '2 to do'},
        ],
        nextToDoListId: 3,
    }

    addToDoList = (title) => {
        let newToDoList = {
            title: title,
            id: this.nextToDoListId,
        };
        this.nextToDoList++;
        this.setState({
            todolists: [...this.state.todolists, newToDoList]
        })

    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('todolists', stateAsString)
    };


    render = () => {


        let toDoListsElements = this.state.todolists.map(x => {
            return <ToDoList id={x.id} title={x.title} key={x.id}/>
        })

        return (

            <div className="App">
                <ToDoListHeader/>
                {toDoListsElements}
                {/*<ToDoList id={1}/>*/}
                {/*<ToDoList id={2}/>*/}
            </div>
        );
    }
}


export default App;


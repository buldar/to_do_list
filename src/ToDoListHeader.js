import React from 'react';
import ToDoListTitle from "./ToDoListTitle";
import AddNewItemForm from "./AddNewItemForm";



class ToDoListHeader extends React.Component {



    render() {

        return (
            <div className="todoList-header">
                <ToDoListTitle title={this.props.title}/>
                <AddNewItemForm onClick={this.props.onClick}/>
            </div>
        );
    }
}

export default ToDoListHeader;


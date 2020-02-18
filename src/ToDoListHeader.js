import React from 'react';
import ToDoListTitle from "./ToDoListTitle";
import ToDoListForm from "./ToDoListForm";


class ToDoListHeader extends React.Component {
    state = {
        error: false,
        title: ''
    }

    onKeyPress = (e) => {
        if(e.key==='Enter') {
            this.addClick();
        }
    }
    addClick = () => {
        let newText= this.state.title;
        if (newText === "") {
            this.setState(
                {error: true}
            )
        } else {
        this.props.onClick(newText);
        this.setState( {title: ''})
    }}
    changeInput = (e) => {
        this.setState({title: e.currentTarget.value})

        if (e.currentTarget.value != '') {
            this.setState({error: false})
        } else {
            this.setState({error: true})
        }
    }


    render() {
        let classforinput = (this.state.error) ? 'error' : '';
        return (
            <div className="todoList-header">
                <ToDoListTitle title={this.props.title}/>
                <ToDoListForm value={this.state.title}
                              onChange={this.changeInput}
                              onKeyPress={this.onKeyPress}
                              type='text'
                              placeholder="New task name"
                              onClick={this.addClick}/>
                {/*<div className="todoList-newTaskForm">*/}
                {/*    <input value={this.state.title}*/}
                {/*           //autoFocus={true}*/}
                {/*           onChange={this.changeInput}*/}
                {/*           onKeyPress={this.onKeyPress}*/}
                {/*           type="text"*/}
                {/*           placeholder="New task name"*/}
                {/*           className={classforinput}/>*/}
                {/*    <button onClick={this.addClick}>Add</button>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default ToDoListHeader;


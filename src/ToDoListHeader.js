import React from 'react';


class ToDoListHeader extends React.Component {
    state = {
        error: false,
        title: ''
    }
    newTaskTitle = React.createRef();

    onKeyPress = (e) => {
        if(e.key==='Enter') {
            this.addClick();
        }
    }
    addClick = () => {
        let newText= this.newTaskTitle.current.value;
        if (newText === "") {
            this.setState(
                {error: true}
            )
        } else {
        this.props.onClick(newText);
        this.newTaskTitle.current.value = "";
    }}
    //33333
    changeInput = (e) => {


        if (this.newTaskTitle.current.value != '') {
            this.setState({error: false})
        } else {
            this.setState({error: true})
        }
    }


    render() {
        let classforinput = (this.state.error) ? 'error' : '';
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input value={this.state.title}
                           onChange={this.changeInput}
                           ref={this.newTaskTitle}
                           onKeyPress={this.onKeyPress}
                           type="text"
                           placeholder="New task name"
                           className={classforinput}/>
                    <button onClick={this.addClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default ToDoListHeader;


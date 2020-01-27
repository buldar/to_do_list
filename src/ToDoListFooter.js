import React from 'react';
import ButtonFooter from "./ButtonFooter";


class ToDoListFooter extends React.Component {
    render = (props) => {
        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";
        return (
            <div className="todoList-footer">
                <ButtonFooter title={'All'} btnClass={classForAll} onClick={()=>{this.props.changeFilter('All')}}/>
                <ButtonFooter title={'Completed'} btnClass={classForCompleted} onClick={()=>{this.props.changeFilter('Completed')}}/>
                <ButtonFooter title={'Active'} btnClass={classForActive} onClick={()=>{this.props.changeFilter('Active')}}/>
            </div>
        );
    }
}

export default ToDoListFooter;


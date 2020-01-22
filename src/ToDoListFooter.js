import React from 'react';


class ToDoListFooter extends React.Component {
    render = () => {
        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForComplited = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";
        return (
            <div className="todoList-footer">
                <button className={classForAll}>All</button>
                <button className={classForComplited}>Complited</button>
                <button className={classForActive}>Active</button>
            </div>
        );
    }
}

export default ToDoListFooter;


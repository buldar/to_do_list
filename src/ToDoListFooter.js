import React from 'react';
import ButtonFooter from "./ButtonFooter";


class ToDoListFooter extends React.Component {

    state ={
        showbtns: true,
    }

    changeShow = () => {
    this.setState(
        {
            showbtns: !this.state.showbtns,
        }
    )
}

    render = (props) => {
        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";
        return (
            <div>
                {this.state.showbtns &&  <div className="todoList-footer">
                <ButtonFooter title={'All'} btnClass={classForAll} onClick={()=>{this.props.changeFilter('All')}}/>
                <ButtonFooter title={'Completed'} btnClass={classForCompleted} onClick={()=>{this.props.changeFilter('Completed')}}/>
                <ButtonFooter title={'Active'} btnClass={classForActive} onClick={()=>{this.props.changeFilter('Active')}}/>
            </div>}
                <div>
                    {this.state.showbtns &&    <span onClick={this.changeShow}>HIDE</span>}
                    {!this.state.showbtns &&  <span onClick={this.changeShow}>SHOW</span>}
                </div>
            </div>
        );
    }
}

export default ToDoListFooter;


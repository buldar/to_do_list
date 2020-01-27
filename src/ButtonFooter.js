import React from 'react';


class ButtonFooter extends React.Component {
    render = (props) => {
        return (
                <button onClick={this.props.onClick} className={this.props.btnClass}>{this.props.title}</button>
        );
    }
}

export default ButtonFooter;


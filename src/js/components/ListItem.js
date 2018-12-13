import React, { Component } from 'react';

class ListItem extends Component {
    render() {
        return (
            <div className="item">
                <span>{this.props.text}</span>
            </div>
        );
    }
}

export default ListItem ;

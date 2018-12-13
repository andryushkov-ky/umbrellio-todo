import React, { Component } from 'react';

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }

    render() {
        return (
            <div className="item">
                <div className="wrap-text">
                    <div
                        className={`check toggle-${this.props.item.completed}`}
                        onClick={() => this.props.toggleTask(this.props.item.key)}
                    ></div>
                    <span>{this.props.item.text}</span>
                </div>
                <div className="sub-panel">
                    <span
                        className="delete"
                        onClick={() => this.props.deleteTask(this.props.item.key)}
                    ></span>
                </div>
            </div>
        );
    }
}

export default ListItem ;

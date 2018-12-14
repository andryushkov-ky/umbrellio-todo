import React, { Component } from 'react';

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            currentValue: this.props.item.text
        };

        this.toggleEditState = this.toggleEditState.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    toggleEditState() {
        const state = this.state.edit;

        this.setState({
            edit: !state
        })
    }

    handleInput = e => {
        this.setState({
            currentValue: e.target.value
        })
    };

    submit = e => {
        const newText = this.state.currentValue;
        e.preventDefault();

        if (newText == '') return null;

        if (newText !== this.props.item.text) {
            this.props.editTask(this.props.item.key, newText);
        }

        this.toggleEditState();
    };

    render() {
        return (
            <div className="item">
                {
                    !this.state.edit &&
                    <div className="show-mode">
                        <div className="wrap-text">
                            <div
                                className={`check toggle-${this.props.item.completed}`}
                                onClick={() => this.props.toggleTask(this.props.item.key)}
                            ></div>
                            <span className="text">{this.props.item.text}</span>
                        </div>
                        <div className="sub-panel">
                            <span
                                className="edit"
                                onClick={this.toggleEditState}>
                            </span>
                            <span
                                className="delete"
                                onClick={() => this.props.deleteTask(this.props.item.key)}>
                            </span>
                        </div>
                    </div>
                }
                {
                    this.state.edit &&
                    <div className="edit-mode">
                        <form onSubmit={this.submit}>
                            <input
                                className="task-input"
                                placeholder="Edit task"
                                value={this.state.currentValue}
                                onChange={this.handleInput}
                            />
                            <button
                                className="task-btn"
                                type="submit">
                                Edit
                            </button>
                        </form>
                    </div>
                }

            </div>
        );
    }
}

export default ListItem ;

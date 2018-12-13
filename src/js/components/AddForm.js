import React, { Component } from 'react';

class AddForm extends Component {
    render() {
        return (
            <div className="addform">
                <form onSubmit={this.props.addTask}>
                    <input
                        className="main-input"
                        placeholder="Task"
                        value={this.props.currentValue}
                        onChange={this.props.handleInput}
                    />
                    <button
                        className="main-btn"
                        type="submit">
                        Add Task
                    </button>
                </form>
            </div>
        );
    }
}

export default AddForm;

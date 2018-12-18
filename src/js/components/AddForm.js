import React, { Component } from 'react';

class AddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentValue: '',
        };
    }

    handleInput = e => {
        this.setState({
            currentValue: e.target.value
        })
    };

    validateForm = () => {
        return this.state.currentValue.trim() === ''
    };

    handleSubmit = e => {
        e.preventDefault();

        if (this.validateForm()) return null;

        const task = {
            text: this.state.currentValue,
            completed: false,
            key: Date.now()
        };

        this.props.addTask(task);

        this.setState({
            currentValue: ''
        });

        e.target.reset();
    };

    render() {
        return (
            <div className="addform">
                <form onSubmit={this.handleSubmit}>
                    <input
                        className="main-input"
                        placeholder="Task"
                        value={this.state.currentValue}
                        onChange={this.handleInput}/>
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

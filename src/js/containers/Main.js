import React, { Component } from 'react';

import AddForm from '../components/AddForm';
import List from '../components/List'

class Main extends Component {
    constructor() {
        super();
        this.state = {
            todos: [{text: 'Default', key: 123, completed: false}, {text: 'Default', key: 1234, completed: false}],
            currentValue: '',
        }
    }

    addTask = e => {
        e.preventDefault();

        if (this.state.currentValue == '') return null;

        const task = {
            text: this.state.currentValue,
            completed: false,
            key: Date.now()
        };
        const todos = [task, ...this.state.todos];
        this.setState({
            todos: todos,
            currentValue: ''
        });
        e.target.reset();
    };

    handleInput = e => {
        this.setState({
            currentValue: e.target.value
        })
    };

    deleteTask = key => {
        const newArr = this.state.todos.filter(item => {
            return item.key !== key
        });
        this.setState({
            todos: newArr,
        })
    };

    toggleTask = key => {
        const newArr = this.state.todos;
        const index = newArr.findIndex((obj => obj.key === key));
        newArr[index].completed = !newArr[index].completed;

        this.setState({
            todos: newArr,
        })
    };

    render() {
        return (
            <div className="main">
                <AddForm
                    addTask={this.addTask}
                    handleInput={this.handleInput}
                />
                <List
                    tasks={this.state.todos}
                    deleteTask={this.deleteTask}
                    toggleTask={this.toggleTask}
                />
            </div>
        );
    }
}

export default Main;

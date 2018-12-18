import React, { Component } from 'react';

import AddForm from '../components/AddForm';
import List from '../components/List'
const update = require('immutability-helper');

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [
                {text: 'Default 1', key: 123, completed: false},
                {text: 'Default 2', key: 12343, completed: false},
                {text: 'Default 3', key: 12344, completed: false},
                {text: 'Default 4', key: 12345, completed: false}
            ],
        };
    }

    addTask = task => {
        const todos = [task, ...this.state.todos];

        this.setState({
            todos: todos
        });
    };

    toggleTask = key => {
        const arr = this.state.todos;
        const index = arr.findIndex((obj => obj.key === key));

        arr[index].completed = !arr[index].completed;

        this.setState({
            todos: arr,
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

    editTask = (key, newText) => {
        const arr = this.state.todos;
        const index = arr.findIndex((obj => obj.key === key));
        arr[index].text = newText;

        this.setState({
            todos: arr,
        })
    };

    moveCard = (dragIndex, hoverIndex) => {
        const { todos } = this.state;
        const dragTask = todos[dragIndex];

        this.setState(
            update(this.state, {
                todos: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragTask]],
                },
            }),
        )
    };

    render() {
        return (
            <div className="main">
                <AddForm
                    addTask={this.addTask}/>
                <List
                    tasks={this.state.todos}
                    deleteTask={this.deleteTask}
                    toggleTask={this.toggleTask}
                    editTask={this.editTask}
                    moveCard={this.moveCard}/>
            </div>
        );
    }
}

export default Main;

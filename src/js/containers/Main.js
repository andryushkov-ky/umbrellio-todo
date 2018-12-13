import React, { Component } from 'react';

import AddForm from '../components/AddForm';
import List from '../components/List'

class Main extends Component {
    constructor() {
        super();
        this.state = {
            todos: [
                {text:"TEST1", key:1231},
                {text:"TEST2", key:1232}
            ],
            currentValue: {text:'', key:''},
        }
    }

    handleInput = e => {
        console.log("got input val");
    };

    addTask = e => {
        e.preventDefault();
        console.log("got task");
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
                />
            </div>
        );
    }
}

export default Main;

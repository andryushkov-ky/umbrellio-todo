import React, { Component } from 'react';

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import ListItem from './ListItem'

class List extends Component {
    render() {
        return (
            <div className="list">
                {
                    this.props.tasks &&
                    !!this.props.tasks.length &&
                    this.props.tasks.map((item, index) =>
                        <ListItem
                            item={item}
                            completed={item.completed}
                            key={item.key}
                            id={item.key}
                            index={index}
                            deleteTask={this.props.deleteTask}
                            toggleTask={this.props.toggleTask}
                            editTask={this.props.editTask}
                            moveCard={this.props.moveCard}/>)
                }
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(List);

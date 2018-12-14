import React, { Component } from 'react';

import ListItem from './ListItem'

class List extends Component {
    render() {
        return (
            <div className="list">
                {
                    this.props.tasks &&
                    !!this.props.tasks.length &&
                    this.props.tasks.map((item, key) =>
                        <ListItem
                            item={item}
                            key={key}
                            deleteTask={this.props.deleteTask}
                            toggleTask={this.props.toggleTask}
                            editTask={this.props.editTask}
                    />)
                }
            </div>
        );
    }
}

export default List ;

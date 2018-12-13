import React, { Component } from 'react';

import ListItem from './ListItem'

class List extends Component {
    render() {
        console.log("HEy there", this.props.tasks);
        return (
            <div className="list">
                {
                    this.props.tasks &&
                    this.props.tasks.length &&
                    this.props.tasks.map(item => <ListItem text={item.text} key={item.key} />)
                }
            </div>
        );
    }
}

export default List ;

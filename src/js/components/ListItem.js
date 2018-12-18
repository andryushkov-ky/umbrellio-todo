import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import {
    DragSource,
    DropTarget,
} from 'react-dnd';

import flow from 'lodash/flow';

const taskSource = {
    beginDrag(props) {
        return {
            key: props.key,
            index: props.index,
        }
    },
};

const taskTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = (findDOMNode(
            component,
        )).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            currentValue: this.props.item.text
        };
    }

    toggleEditState = () => {
        const state = this.state.edit;

        this.setState({
            edit: !state
        })
    };

    handleInput = e => {
        this.setState({
            currentValue: e.target.value
        })
    };

    submit = e => {
        const newText = this.state.currentValue;
        e.preventDefault();

        if (this.validateInput()) return null;

        if (newText !== this.props.item.text) {
            this.props.editTask(this.props.item.key, newText);
        }

        this.toggleEditState();
    };

    validateInput = () => {
        return this.state.currentValue.trim() === ''
    };

    renderTextItem = () => {
        return (
            <div className="show-mode">
                <div className="wrap-text">
                    <div
                        className={`check toggle-${this.props.completed}`}
                        onClick={() => this.props.toggleTask(this.props.item.key)}>
                    </div>
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
        )
    };

    renderEditItem = () => {
        return (
            <div className="edit-mode">
                <form onSubmit={this.submit}>
                    <input
                        className="task-input"
                        placeholder="Edit task"
                        value={this.state.currentValue}
                        onChange={this.handleInput}/>
                    <button
                        className="task-btn"
                        type="submit">
                        Edit
                    </button>
                </form>
            </div>
        )
    };

    render() {
        const {
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props;
        const opacity = isDragging ? 0 : 1;

        return (
            connectDragSource &&
            connectDropTarget &&
            connectDragSource(
                connectDropTarget(<div style={{ opacity }}>
                    <div className="item">
                        {
                            !this.state.edit && this.renderTextItem()
                        }
                        {
                            this.state.edit && this.renderEditItem()
                        }

                    </div>
                </div>),
            )
        );
    }
}

export default flow(
    DragSource(
        'task',
        taskSource,
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        }),
    ),
    DropTarget('task', taskTarget, (connect) => ({
        connectDropTarget: connect.dropTarget(),
    }))
)(ListItem);

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {spring, TransitionMotion} from 'react-motion';

import TodoItem from './todoItem.js';
import {toggleTodo, removeTodo} from '../actions.js';
import {FilterTypes} from '../../constants.js';

const TodoList = ({todos, onToggleTodo, onRemoveTodo}) => {
	const styles = getStyles(todos);
	return (
		<TransitionMotion 
		willEnter={willEnter} 
		willLeave={willLeave}
		styles={styles}
		>
			{
				interpolatedStyles =>
				<ul className="todo-list">
					{
						interpolatedStyles.map(config => {
							const {data, style, key} = config;
							const item = data;
							return (<TodoItem 
							style={style} 
							key={key} 
							id={item.id}
							text={item.text}
							completed={item.completed}
							onToggle={() => onToggleTodo(item.id)}
							onRemove={() => onRemoveTodo(item.id)}
							/>);
						})
					}
				</ul>
			}
		</TransitionMotion>
	);
};

const getStyles = (todos) => {
	return todos.map(item => {
		return {
			key: item.id.toString(),
			data: item,
			style: {
				height: spring(60),
				opacity: spring(1)
			}
		};
	});
}

const willEnter = () => {
	return {
		height: 0,
		opacity: 0
	};
};

const willLeave = () => {
	return {
		height: spring(0),
		opacity: spring(0)
	};
};
TodoList.propTypes = {
	todos: PropTypes.array.isRequired
};


const selectVisibleTodos = (todos, filter) => {
	switch (filter) {
		case FilterTypes.ALL:
			return todos;
		case FilterTypes.COMPLETED:
			return todos.filter(item => item.completed);
		case FilterTypes.UNCOMPLETED:
			return todos.filter(item => !item.completed);
		default: 
			throw new Error("unsupported filter");
	}
}

const mapStateToProps = (state) => {
	return {
		todos: selectVisibleTodos(state.todos, state.filter)
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleTodo: (id) => {
			dispatch(toggleTodo(id));
		},
		onRemoveTodo: (id) => {
			dispatch(removeTodo(id));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
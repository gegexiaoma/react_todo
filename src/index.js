import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp.js';
import store from './Store.js';
import {Provider} from 'react-redux';


ReactDOM.render(
	<Provider store={store}>
		<TodoApp />
	</Provider>,
	document.getElementById('root'));
	


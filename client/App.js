import React, { Component } from 'react';
import io from 'socket.io-client';
import { hot } from 'react-hot-loader'
import styles from './assets/App.css';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';
import UsersListJoined from './UsersListJoined';

const socket = io('/');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			messages: [],
			text: '',
			name: '',
			avatar: null
		};
	}

	componentDidMount() {
		socket.on('message', message => this.messageReceive(message));
		socket.on('update', ({users}) => this.chatUpdate(users));
	}

	componentWillUnmount() {
		socket.removeListener('message', this.messageReceive());
		socket.removeListener('update', this.chatUpdate());
	}

	messageReceive(message) {
		const messages = [message, ...this.state.messages];
		this.setState({messages});
	}

	chatUpdate(users) {
		this.setState({users});	
	}

	handleMessageSubmit(message) {
		const messages = [message, ...this.state.messages];
		this.setState({messages});
		socket.emit('message', message);
	}

	handleUserSubmit(name, avatar) {
		this.setState({name});
		this.setState({avatar});
		socket.emit('join', name, avatar);
	}

	renderUserForm() {
		return (
			<UserForm onUserSubmit={(name, avatar) => this.handleUserSubmit(name, avatar) } />
		)
	}

	render() {
		return this.state.name !== '' ? (this.renderLayout()) : this.renderUserForm() 
	}

	renderLayout() {
		return (
			<div className={styles.App}>
				<div className={styles.AppHeader}>
					<div className={styles.AppTitle}>ChatApp</div>
				</div>
				<div className={styles.AppBody}>
					<UsersList users={this.state.users} avatar={this.state.avatar} />
					<div className={styles.MessageWrapper}>
						<div className={styles.UsersJoined}>
							<UsersListJoined users={this.state.users} />
						</div>
						<MessageList messages={this.state.messages} />
						<MessageForm onMessageSubmit={message => this.handleMessageSubmit(message)}	name={this.state.name} />
					</div>
				</div>
			</div>
		);
	}
}

export default hot(module)(App);

import React, { Component } from 'react';
import styles from './assets/UserForm.css';

class UserForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onUserSubmit(this.state.name);
	}

	handleChange(e) {
		this.setState({ name : e.target.value });
	}

	render() {
		return (
			<form className={styles.UserForm}>
				<div className={styles.FormBox}>
					<input 
						className={styles.UserInput}
						placeholder="Write your nickname and click button"
						onChange={e => this.handleChange(e)}
						value={this.state.name}
					/>
					<button className={styles.FormBtn} onClick={e => this.handleSubmit(e)}>GO!</button>
				</div>
			</form>
		);
	}
}

export default UserForm;
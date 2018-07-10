import React from 'react'
import styles from './assets/MessageList.css';

const Message = props => (
	<div className={styles.Message}>
		<p className={styles.MessageTxt}><strong>{props.from} : </strong>{props.text}</p>
	</div>
);

const MessageList = props => (
	<div className={styles.MessageList}>
	    {
	    	props.messages.map((message, i) => {
	        	return (
		          	<Message key={i} from={message.from} text={message.text} />
	        	);
	      	})
	    }
	</div>
);

export default MessageList;
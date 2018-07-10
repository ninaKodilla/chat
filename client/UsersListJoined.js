import React from 'react'
import styles from './assets/UsersList.css';

const UsersListJoined = props => (
    <div className={styles.UsersJoin}>
        <ul className={styles.UserJoinList}>
        {
            props.users.map((user) => {
                return (
                    <li key={user.id} className={styles.UserItemJoin}>{user.name} joined to chat!</li>
                );
            })
        }
        </ul>
    </div>
);

export default UsersListJoined;
import React from 'react';
import './Messages.css';

const Message = ({msg}) => {
    return (
        <div className='message-card'>
            <div className='message-card-subject'>{msg.subject}</div>
            <div className='message-card-content'>{msg.data}</div>

        </div>
    );
};

export default Message;
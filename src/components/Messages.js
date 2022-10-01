import React from 'react';
import Message from './Message';
import './Messages.css';

const Messages = ({messages}) => {
    return (
        <div className='messages-box'>
            {messages.map( (msg) => {
                return(
                    <Message key={msg.key} msg={msg} />
                )
            })}
        </div>
    );
};

export default Messages;
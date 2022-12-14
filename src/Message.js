import React from 'react'
import "./Message.css"

function Message({ message, timestamp, user, userImgUrl}) {
  return (
    <div>
        <div className="message">
            <img src={userImgUrl} alt="" />
            <div className="message__info">
                <h4>
                    {user} <span className='message__timestamp'>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </h4>
                <p>{message}</p>
            </div>
        </div>
    </div>
  )
}

export default Message
import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Chat.css"
import {db} from "./firebase"
import Message from './Message';
import ChatInput from './ChatInput';

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setroomDetails] = useState(null)
  const [roomMessages, setroomMessages] = useState([])

  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId)
      .onSnapshot((snapshot) => (
        setroomDetails(snapshot.data())
      ))
    }
    db.collection('rooms').doc(roomId)
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot((snapshot) =>
      setroomMessages(snapshot.docs.map((doc) => doc.data()))
    )
  }, [roomId]);

  return (
    <div className='chat'>
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className='chat__channelName'>
            <strong>#{roomDetails?.name}</strong>
            <StarBorderOutlined />
          </h4>
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoOutlined /> Details
          </p>
        </div>
      </div>
      <div className='chat__messages'>
        {roomMessages.map(({ message, timestamp, user, userImgUrl }) => (
          <Message
            key={timestamp}
            message={message}
            timestamp={timestamp}
            user={user}
            userImgUrl={userImgUrl}
          />
        ))}
      </div>
      <ChatInput channelName={roomDetails?.name} channelId={roomId}/>
    </div>  
  )
}

export default Chat
import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import "./ChatInput.css"
import { db } from './firebase';
import { useStateValue } from "./StateProvider"
import firebase from 'firebase/compat/app'

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState(" ");
    const [{ user }] = useStateValue();
    const sendMessage = (e) => {
      e.preventDefault();
      if (channelId && input.length > 0) {
        console.log(user);
        db.collection("rooms").doc(channelId).collection("messages").add({
          message: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: user.displayName,
          userImgUrl: user.photoURL,
        });
        setInput("")
      } else {
        alert("please enter a valid entry")
      }
    };
    return (
      <div className="chatInput">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message to #${channelName?.toLowerCase()}`}
          />
          <button type="submit" onClick={sendMessage}>
            SEND
          </button>
        </form>
      </div>
    );
  }
  
  export default ChatInput;
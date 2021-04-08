import { FormControl, InputLabel, Input } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import Message from "./components/Message";
import { db } from "./firebase/firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currUser, setcurrUser] = useState("");

  useEffect(() => {
    setcurrUser(window.prompt("Enter your Name : "));
  }, []);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      db.collection("messages")
        .add({
          username: currUser,
          text: message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setMessage("");
        });
    }
  };

  return (
    <div className="App">
      <img
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt=""
      />
      <h2>Welcome {currUser}</h2>
      <form className="app__form" autoComplete="off">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            id="my-input"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Message"
          />
          <IconButton
            className="app__iconButton"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!message.trim()}
            onClick={(e) => sendMessage(e)}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      {/* Messages */}
      <FlipMove>
        {messages.map(({ id, data }) => (
          <Message message={data} currUser={currUser} key={id} />
        ))}
      </FlipMove>
    </div>
  );
};

export default App;

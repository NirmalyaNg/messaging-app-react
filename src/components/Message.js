import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ message, currUser }, ref) => {
  const isUser = currUser === message.username;
  return (
    <div className={`message ${isUser ? "message__user" : ""}`} ref={ref}>
      <p style={{ textAlign: "left", color: "grey" }}>
        {/* {new Date(message.timestamp.seconds * 1000).toDateString()} */}
        {message.username
          ? message.username === currUser
            ? ""
            : message.username
          : "Anonymous user"}
      </p>
      <Card
        className={`${isUser ? "message__userCard" : "message__guestCard"}`}
      >
        <CardContent>
          <Typography variant="h6" component="h3">
            {message.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;

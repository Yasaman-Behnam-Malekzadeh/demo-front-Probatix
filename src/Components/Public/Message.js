import React from "react";
import "./Message.scss";

function Messages({ responseMessage, responseStatus }) {
  let message;
  const messageFunc = (status) => {
    switch (status) {
      case "":
        message = null;
        break;
      case 200:
        message =
          "User successfully created:) Please Login with your Email and Password.";
        break;
      case 400:
        message = "User already exists!";
        break;
      case 500:
        message = "User or Passwrod is wrong!";
        break;
      default:
        message = responseMessage;
        break;
    }
  };
  messageFunc(responseStatus);
  return (
    <>
      {message != null ? (
        <div
          className={
            responseStatus === 200
              ? "message message--success"
              : "message message--danger"
          }
        >
          {message}
        </div>
      ) : null}
    </>
  );
}

export default Messages;

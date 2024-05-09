import React, { useState } from "react";
import "./DynamicForm.scss";
import axios from "axios";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { useHistory } from "react-router-dom";
import Message from "../Public/Message";

function IncomeForm() {
  const [changeBtn, setChangeBtn] = useState(true);
  const [message, setMessage] = useState({});
  const history = useHistory();

  const setMessageEmpty = () => {
    // show notification a period of time
    setTimeout(function () {
      setMessage("");
    }, 5000);
  };
  const handleSignUpSubmit = async (value) => {
    // post a new user
    axios
      .post(
        "http://localhost:3000/api/register",
        {
          email: value.email,
          password: value.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        setMessage({
          //show the notifaction to user
          message: response.data.status,
          status: response.status,
        });
        setMessageEmpty();
      })
      .catch(function (error) {
        setMessage({
          //show the notifaction to user
          message: error.response.data.error.message,
          status: error.response.status,
        });
        setMessageEmpty();
      });
  };
  const handleLoginSubmit = async (value) => {
    // login with username and password
    axios
      .post("http://localhost:3000/api/login", {
        email: value.email,
        password: value.password,
      })
      .then(function () {
        history.push("/applications");
      })
      .catch(function (error) {
        setMessage({
          message: error.response.data.errors[0].message,
          status: error.response.status,
        });
        setMessageEmpty();
      });
  };

  return (
    <div className="form">
      <div className="form__wrapper">
        <div className="form__wrapper__selector">
          <button
            className={changeBtn === true ? "active" : null}
            onClick={() => setChangeBtn(!changeBtn)}
          >
            Sign up
          </button>
          <button
            className={changeBtn === false ? "active" : null}
            onClick={() => setChangeBtn(!changeBtn)}
          >
            Log in
          </button>
        </div>

        {changeBtn === true ? (
          <SignUpForm onSubmit={handleSignUpSubmit} />
        ) : (
          <LoginForm onSubmit={handleLoginSubmit} />
        )}
      </div>
      {message === null ? null : (
        <Message
          responseMessage={message.message}
          responseStatus={message.status}
        />
      )}
    </div>
  );
}

export default IncomeForm;

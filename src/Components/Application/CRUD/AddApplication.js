import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Header from "../../Layout/Header";
import Message from "../../Public/Message";
import "./CRUDApplication.scss";

function AddApplcation() {
  const [name, setName] = useState();
  const [secret, setSecret] = useState();
  const [lang, setLang] = useState();
  const [version, setVersion] = useState();
  const [message, setMessage] = useState({});
  const history = useHistory();
  const location = useLocation();
  const setMessageEmpty = () => {
    // show notification a period of time
    setTimeout(function () {
      setMessage("");
    }, 5000);
  };

  const handleSubmit = async (e) => {
    // post current applcation
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/applications", {
        name: name,
        secret: secret,
        lang: lang,
        version: version,
      })
      .then(function () {
        history.push("/applications"); // go to home page after posting
      })
      .catch(function (error) {
        console.log(error);
        setMessage({
          // don't post current application for repeating of id and show the reason
          message: error.response.data.status,
          status: error.response.status,
        });
        setMessageEmpty();
      });
  };

  return (
    <>
      <Header title="Add new Application" location={location.pathname} />
      <div className="crud-form d-flex justify-content-center h-100">
        <form onSubmit={handleSubmit} className="crud-form__card">
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="secret">Secret:</label>
          <input
            name="secret"
            type="text"
            onChange={(e) => setSecret(e.target.value)}
          />
          <label htmlFor="lang">Lang:</label>
          <input
            name="lang"
            type="text"
            onChange={(e) => setLang(e.target.value)}
          />
          <label htmlFor="version">Version:</label>
          <input
            name="version"
            type="number"
            onChange={(e) => setVersion(e.target.value)}
          />
          <div className="crud-form__card__bottom">
            <Link className="btn-item btn-item--red" to="/applications">
              Cancel
            </Link>
            <button className="btn-item btn-item--green" type="submit">
              Add
            </button>
          </div>
        </form>
        {message === null ? null : (
          <Message
            responseMessage={message.message}
            responseStatus={message.status}
          />
        )}
      </div>
    </>
  );
}

export default AddApplcation;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import ReactLoading from "react-loading";
import Header from "../../Layout/Header";
import "./CRUDApplication.scss";

function EditApplcation() {
  const [name, setName] = useState();
  const [secret, setSecret] = useState();
  const [lang, setLang] = useState();
  const [version, setVersion] = useState();
  const [applications, setApplications] = useState();
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const { idApp } = useParams();
  const location = useLocation();

  useEffect(() => {
    const getData = () => {
      // get all details of selected application
      axios
        .get(`/api/applications/${idApp}`, {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        })
        .then((res) => {
          setApplications(res.data); //after get the details,push it on to a state
          setLoading(false); //after get change loading
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, [idApp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .put(`/api/applications/${idApp}`, {
        //post detail of current application
        // id: id,
        name: name,
        secret: secret,
        lang: lang,
        version: version,
      })
      .then(function () {
        history.push("/applications"); //after posting the details, go home page
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {loading && <ReactLoading type="balls" color="#dddddd" />}
      {!loading && (
        <>
          <Header
            location={location.pathname}
            title={`Edit Application with name: ${applications.name}`}
          />
          <div className="crud-form">
            <form onSubmit={handleSubmit} className="crud-form__card">
              <label htmlFor="name">Name:</label>
              <input
                name="name"
                type="text"
                defaultValue={applications.name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="secret">Secret:</label>
              <input
                name="secret"
                type="text"
                defaultValue={applications.secret}
                onChange={(e) => setSecret(e.target.value)}
              />
              <label htmlFor="lang">Lang:</label>
              <input
                name="lang"
                type="text"
                defaultValue={applications.lang}
                onChange={(e) => setLang(e.target.value)}
              />
              <label htmlFor="version">Version:</label>
              <input
                name="version"
                type="number"
                defaultValue={applications.version}
                onChange={(e) => setVersion(e.target.value)}
              />
              <div className="crud-form__card__bottom">
                <Link className="btn-item btn-item--red" to="/applications">
                  Cancel
                </Link>
                <button className="btn-item btn-item--green" type="submit">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default EditApplcation;

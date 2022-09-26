import React, { useState, useEffect } from "react";
import "./ApplicationsList.scss";
import ApplicationListItem from "./ApplicationListItem";
import ReactLoading from "react-loading";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Header from "../Layout/Header";

function ApplicationList() {
  const [applications, setApplications] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/applications", {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      })
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);
  // console.log(location.pathname);

  return (
    <div className="application-list">
      <Header
        title="This is a code challenge for Venture Leap Gmbh"
        location={location.pathname}
      />
      <div className="application-list__content">
        <div className="application-list__content__add">
          <Link to="/applications/create">Add Application</Link>
        </div>
        {loading && <ReactLoading type="balls" color="#dddddd" />}
        {!loading && applications.length !== 0 ? (
          <table className="application-list__content__table">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>secret</th>
                <th>lang</th>
                <th>version</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              <ApplicationListItem applicationsList={applications} />
            </tbody>
          </table>
        ) : (
          ""
        )}
        {!loading && applications.length === 0 ? (
          <div className="application-list__content__empty">
            There isn't any Application.
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ApplicationList;

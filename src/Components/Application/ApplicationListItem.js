import axios from "axios";
import React from "react";
import "./ApplicationListItem.scss";
import { Link, useHistory } from "react-router-dom";

function ApplicationListItem({ applicationsList }) {
  const history = useHistory();
  const handleRemove = (item) => {
    //delete selected application
    axios
      .delete(`http://localhost:3000/api/applications/${item}`)
      .then(() => {
        history.push("/applications");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {console.log(applicationsList)}
      {applicationsList.map((item) => {
        return (
          <tr className="application-list-item" key={item.id}>
            <td>{item.name}</td>
            <td>{item.secret}</td>
            <td>{item.lang}</td>
            <td>{item.version}</td>
            <td className="application-list-item__btn">
              <button
                className="application-list-item__btn__item application-list-item__btn__item--red"
                onClick={() => handleRemove(item.id)}
              >
                Delete
              </button>
              <Link
                className="application-list-item__btn__item application-list-item__btn__item--blue"
                to={`/applications/edit/${item.id}`}
              >
                Edit
              </Link>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default ApplicationListItem;

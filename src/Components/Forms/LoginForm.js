import React from "react";
import "./FormItem.scss";
import { reduxForm, Field } from "redux-form";

let LoginForm = (props) => {
  const { handleSubmit } = props;
  let inputItems = [
    //all inputs
    { name: "email", type: "input" },
    { name: "password", type: "password" },
  ];

  return (
    <form className="form-item" onSubmit={handleSubmit}>
      {inputItems.map((item, index) => (
        <Field
          key={index}
          component="input"
          className="form-item__field"
          placeholder={item.name}
          name={item.name}
          type={item.type}
          autoComplete="on"
          required
        />
      ))}
      <button action="submit" className="form-item__btn" type="submit">
        login
      </button>
    </form>
  );
};

export default reduxForm({
  form: "login-form",
})(LoginForm);

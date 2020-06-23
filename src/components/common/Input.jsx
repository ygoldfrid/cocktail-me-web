import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <input
        {...rest}
        id={name}
        name={name}
        placeholder={`${label}*`}
        className="input-auth form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;

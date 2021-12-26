import React from "react";

const Input = ({ type, placeHolder, name, value, onChange, error }) => {
  return (
    <React.Fragment key={type}>
      <div className="form-group mb-1">
        <input
          className="form-control form-control-lg"
          type={type}
          placeholder={placeHolder}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Input;

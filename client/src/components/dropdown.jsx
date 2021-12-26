import React from "react";

const DropDown = ({ username, logout }) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {username}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="/Profile">
          Profile
        </a>
        <a className="dropdown-item" href="#" onClick={logout}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default DropDown;

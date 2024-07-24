import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function Header() {
  const usenavigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");

    usenavigate("/");
  };

  const user = sessionStorage.getItem("username");
  return (
    <Navbar className="bg-body-tertiary d-flex justify-content-between">
      <Navbar.Brand className="ms-3 text-success" href="/home">
        <h3>Personal Expense Tracker</h3>
      </Navbar.Brand>

      <div>
        Welcome <span className="text-danger">{user} </span>
        <button className="btn btn-danger me-4 rounded" onClick={logout}>
          LogOut <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </Navbar>
  );
}

export default Header;

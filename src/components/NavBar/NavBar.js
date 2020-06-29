import React from 'react';
import './NavBar.css';
import { NavLink } from "react-router-dom";

export default props => {
  return (

    <nav className="main-navbar navbar-expand-lg navbar-light">
      <NavLink className="btn" activeClassName="btn-success" exact to="/">На главную</NavLink>
      <NavLink className="btn" activeClassName="btn-success" to="/add/">Добавить сотрудника</NavLink>
    </nav>

  );
}

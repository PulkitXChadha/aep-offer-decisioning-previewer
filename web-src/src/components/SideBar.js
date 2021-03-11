/*
 * <license header>
 */

import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = (props) => {
  return (
    <ul className="SideNav">
      <li className="SideNav-item">
        <NavLink
          className="SideNav-itemLink"
          activeClassName="is-selected"
          aria-current="page"
          exact
          to="/"
        >
          Home
        </NavLink>
      </li>
      {props.isSandboxSelected && (
        <li className="SideNav-item">
          <NavLink
            className="SideNav-itemLink"
            activeClassName="is-selected"
            aria-current="page"
            to="/previewer"
          >
            Previewer
          </NavLink>
        </li>
      )}
      <li className="SideNav-item">
        <NavLink
          className="SideNav-itemLink"
          activeClassName="is-selected"
          aria-current="page"
          to="/aiostatelist"
        >
          AIO State List
        </NavLink>
      </li>
      <li className="SideNav-item">
        <NavLink
          className="SideNav-itemLink"
          activeClassName="is-selected"
          aria-current="page"
          to="/about"
        >
          About this Apps
        </NavLink>
      </li>
    </ul>
  );
};

export default SideBar;

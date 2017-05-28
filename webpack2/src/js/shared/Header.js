import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { DropdownButton, MenuItem } from 'react-bootstrap';
import _ from 'lodash';


const Header = (menuItem) => { 
  const menus = _.map(menuItem, menues => _.map(menues, (menu, i) => {
    const subMenu = _.map(menu.submenu, (submenu, k) => {
      const link = _.toLower(_.join(_.split(submenu, ' '), '-'));
      return (<li key={k}><NavLink activeClassName="selected" to={link}>{submenu}</NavLink></li>);
    });
    return (
      <li className="nav-item" key={i}>
        <div id={`menuItem-${i}`} className="nav-link">
          {menu.title}
          <ul>{subMenu}</ul>
        </div>
      </li>
    );
  }));
  return (
    <header>
      <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
        <Link to="/" className="navbar-brand">.aJain</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><NavLink exact to="/" className="nav-link" activeClassName="selected">Home</NavLink></li>
              {menus}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

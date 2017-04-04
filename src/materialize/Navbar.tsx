import * as React from 'react';
import { Icon } from './Icon';

import { SideNavButton } from './SideNav';

import './Navbar.scss';

export const Navbar = (props: {
  title: string,
  right: any,
  content: any,
}) =>
  <div className="navbar-fixed">
    <nav className="nav-extended">
      <div className="nav-wrapper">
        <ul>
          <li><SideNavButton><Icon name="menu" /></SideNavButton></li>
        </ul>
        {props.title ? <span className="title">{props.title}</span> : null}
        {props.right}
      </div>
      <div className="nav-content">
        {props.content}
      </div>
    </nav>
  </div>;

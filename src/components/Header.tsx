import React, { Component } from 'react';
import './App.scss';
import './Header.scss';
import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export type HeaderProps = {
};
export type HeaderState = {
};

class Header extends Component<HeaderProps, HeaderState> {
    /* I'm leaving this as a Class because we will need state information here
     * soon.
     */
    render() {
        return (
			<nav id="explorerNav" className="navbar navbar-inverse py-0 bg-primary">
			  <a className="h1 text-light" href="#">explorer</a>
			</nav>
        );
    }
}

export default Header;

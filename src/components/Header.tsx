import React, { Component } from 'react';
import './App.css';
import './Header.css';
import './colors.scss';
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
			<nav className="navbar navbar-expand-lg navbar-light bg-primary">
			  <a className="navbar-brand text-light" href="#">LN Explorer</a>
			</nav>
        );
    }
}

export default Header;

import React, { Component } from 'react';
import './Header.scss';
import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export type HeaderProps = {
};
export type HeaderState = {
};

// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component<HeaderProps, HeaderState> {
    /* I'm leaving this as a Class because we will need state information here
     * soon.
     */
    render() {
        return (
            <nav id="explorerNav" className="navbar navbar-inverse py-0 bg-primary">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="h1 text-light font-weight-bolder" href="#">explorer</a>
            </nav>
        );
    }
}

export default Header;

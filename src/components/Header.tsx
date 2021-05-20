import React, { Component } from 'react';
import './App.css';
import './Header.css';

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
            <div className="header">
                <div className="header-left">
                    explorer
                </div>
            </div>
        );
    }
}

export default Header;

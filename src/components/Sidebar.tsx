import React, { Component } from 'react';
import './Sidebar.scss';

export type SidebarProps = {
};
export type SidebarState = {
};

class Sidebar extends Component<SidebarProps, SidebarState> {
    /* I'm leaving this as a Class because we will need state information here
     * soon.
     */
    render() {
        return (
            <div className="card sidebar">
                Some Control Buttons Here

                Selected cases and stuff
            </div>
        );
    }
}

export default Sidebar;

import React, { Component } from 'react';
import { BookmarkPlus, BookmarkX, QuestionCircle } from 'react-bootstrap-icons';
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
            <div id="bookmarks-sidebar">
                <h4 className="text-muted">
                    <div className="float-left"> Bookmarked Opinions </div>
                    <div className="float-right">
                        <QuestionCircle className="mx-1 align-text-top" />
                        <BookmarkPlus className="align-text-top" />
                        <BookmarkX className="mx-1 align-text-top" />
                    </div>
                </h4>
            </div>
        );
    }
}

export default Sidebar;

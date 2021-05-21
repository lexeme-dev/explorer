import React, { Component } from 'react';
import { BookmarkPlus, BookmarkX, QuestionCircle } from 'react-bootstrap-icons';
import Opinion, { fullCaseName } from '../interfaces/Opinion';
import { OnCaseRemoved } from './App';
import './Sidebar.scss';

export type SidebarProps = {
	opinions: Opinion[];
	onCaseRemoved: OnCaseRemoved;
};

export type SidebarState = {
};

class Sidebar extends Component<SidebarProps, SidebarState> {
    /* I'm leaving this as a Class because we will need state information here
     * soon.
     */
    constructor(props: SidebarProps) {
		super(props);
    }

    render() {
        return (
			<div>
				<div id="bookmarks-header p-3">
					<h4 className="text-muted">
						<div className="float-left"> Bookmarked Opinions </div>
						<div className="float-right">
							<QuestionCircle className="mx-1 align-text-top" />
							<BookmarkPlus className="align-text-top" />
							<BookmarkX className="mx-1 align-text-top" />
						</div>
					</h4>
					<br />
				</div>
				<div className="bookmarks-list pt-3">
					{this.props.opinions.map((opinion) => (
						<div key={opinion.id} className="bookmark-item text-left">
							<BookmarkX className="mx-1 align-text-top" />
							{fullCaseName(opinion)}
						</div>
					))}
				</div>
			</div>
        );
    }
}

export default Sidebar;

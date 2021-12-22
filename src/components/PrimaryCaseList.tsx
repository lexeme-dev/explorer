import React, { Component } from 'react';
import './PrimaryCaseList.scss';
import { Bookmark } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Opinion, { fullCaseName } from '../interfaces/Opinion';
import OpinionDisplay from './OpinionDisplay';
import { OnCasesBookmarked } from './App'

export type PrimaryCaseListProps = {
    recommendedCases: Opinion[];
	searchCases: Opinion[];
    onCaseBookmarked: OnCasesBookmarked;
};
export type PrimaryCaseListState = {
    recommendedCases: Opinion[];
	searchCases: Opinion[];
};

class PrimaryCaseList extends Component<PrimaryCaseListProps, PrimaryCaseListState> {

	constructor(props: PrimaryCaseListProps) {
		super(props);
		this.state = {recommendedCases: props.recommendedCases, searchCases: []};
	}

	componentWillReceiveProps (nextProps: PrimaryCaseListProps) {
		this.setState({recommendedCases: nextProps.recommendedCases});
	}

    render() {
        return (
			<div id="selected-case-list">
				<ul className="list-group justify-content-center">
					{ this.state.recommendedCases.map((opinion) => (
						<li className="list-group-item selected-case-li">
							<div className="flex-selected-case-list-item">
								<div className="selected-case-list-item-name">
									<OpinionDisplay opinion={ opinion } />
								</div>
								<div className="selected-case-list-item-actions">
									<Button variant="primary" className="selected-case-list-trash-btn" size="sm" onClick={() => this.props.onCaseBookmarked(opinion) }> <Bookmark /> </Button>
								</div> 
							</div>
						</li>
					)) }
				</ul>
			</div>
        );
    }
}

export default PrimaryCaseList;

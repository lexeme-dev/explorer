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
			<div id="primary-case-list">
				<ul className="list-group justify-content-center">
					{ this.state.recommendedCases.map((opinion) => (
						<li className="list-group-item primary-case-li">
							<div className="flex-primary-case-list-item">
								<div className="primary-case-list-item-name">
									<OpinionDisplay opinion={ opinion } />
								</div>
								<div className="primary-case-list-item-actions">
									<Button variant="primary" className="primary-case-list-trash-btn" size="sm" onClick={() => this.props.onCaseBookmarked(opinion) }> <Bookmark /> </Button>
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

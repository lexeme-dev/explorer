import React, { Component } from 'react';
import './SelectedCaseList.scss';
import { Trash, XSquare } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Opinion, { fullCaseName } from '../interfaces/Opinion';
import OpinionDisplay from './OpinionDisplay';
import { OnCaseRemoved } from './App'

export type SelectedCaseListProps = {
    selectedCases: Opinion[];
    onCaseRemoved: OnCaseRemoved;
};
export type SelectedCaseListState = {
    selectedCases: Opinion[];
};

class SelectedCaseList extends Component<SelectedCaseListProps, SelectedCaseListState> {

	constructor(props: SelectedCaseListProps) {
		super(props);
		this.state = {selectedCases: props.selectedCases};
	}

	componentWillReceiveProps (nextProps: SelectedCaseListProps) {
		this.setState({selectedCases: nextProps.selectedCases});
	}

    render() {
        return (
			<div id="selected-case-list">
				<h5 id="selected-case-list-header"> Bookmarked Cases </h5>
				<ul className="list-group justify-content-center">
					{ this.state.selectedCases.map((opinion) => (
						<li className="list-group-item selected-case-li">
							<div className="flex-selected-case-list-item">
								<div className="selected-case-list-item-name">
									<OpinionDisplay opinion={ opinion } />
								</div>
								<div className="selected-case-list-item-actions">
									<Button variant="danger" className="selected-case-list-trash-btn" size="sm" onClick={() => this.props.onCaseRemoved(opinion) }> <Trash /> </Button>
								</div> 
							</div>
						</li>
					)) }
				</ul>
			</div>
        );
    }
}

export default SelectedCaseList;

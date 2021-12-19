import React, { Component } from 'react';
import './SelectedCaseList.scss';
import { Trash, XSquare } from 'react-bootstrap-icons';
import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Opinion, { fullCaseName } from '../interfaces/Opinion';
import OpinionDisplay from './OpinionDisplay';

export type SelectedCaseListProps = {
    selectedCases: Opinion[];
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
									<button type="button" className="btn btn-danger btn-sm selected-case-list-trash-btn"> <Trash /> </button>
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

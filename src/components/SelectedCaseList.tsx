import React, { Component } from 'react';
import './SelectedCaseList.scss';
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
				{ this.state.selectedCases.map((opinion) => (
					<OpinionDisplay opinion={ opinion } />
				)) }
			</div>
        );
    }
}

export default SelectedCaseList;

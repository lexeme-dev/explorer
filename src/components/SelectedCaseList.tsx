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

    render() {
        return (
			this.state.selectedCases.map((opinion) => (
				<OpinionDisplay opinion={ opinion } />
			))
        );
    }
}

export default SelectedCaseList;

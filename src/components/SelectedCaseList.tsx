import React from 'react';
import './SelectedCaseList.scss';
import { Trash } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Opinion from '../interfaces/Opinion';
import OpinionDisplay from './OpinionDisplay';
import { OnCaseRemoved, OnCaseDisplayed } from './App';

export type SelectedCaseListProps = {
    selectedCases: Opinion[];
    onCaseRemoved: OnCaseRemoved;
    onCaseDisplayed: OnCaseDisplayed;
};

function SelectedCaseList(props: SelectedCaseListProps) {
    const { selectedCases, onCaseRemoved, onCaseDisplayed } = props;
    return (
        <div id="selected-case-list">
            <h5 id="selected-case-list-header"> Bookmarked Cases </h5>
            <ul className="list-group justify-content-center">
                {selectedCases.map((opinion) => (
                    <li className="list-group-item selected-case-li">
                        <div className="flex-selected-case-list-item">
                            <div className="selected-case-list-item-name">
                                <Button variant="link" className="text-body" onClick={() => onCaseDisplayed(opinion)}>
                                    <OpinionDisplay opinion={opinion} />
                                </Button>
                            </div>
                            <div className="selected-case-list-item-actions">
                                <Button
                                    variant="danger"
                                    className="selected-case-list-trash-btn"
                                    size="sm"
                                    onClick={() => onCaseRemoved(opinion)}
                                >
                                    {' '}
                                    <Trash />
                                    {' '}
                                </Button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SelectedCaseList;

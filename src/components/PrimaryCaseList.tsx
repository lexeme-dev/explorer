import React from 'react';
import './PrimaryCaseList.scss';
import { Bookmark } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Opinion from '../interfaces/Opinion';
import OpinionDisplay from './OpinionDisplay';
import { OnCasesBookmarked } from './App';

export type PrimaryCaseListProps = {
    recommendedCases: Opinion[];
    searchCases: Opinion[];
    onCaseBookmarked: OnCasesBookmarked;
};
export type PrimaryCaseListState = {
    recommendedCases: Opinion[];
    searchCases: Opinion[];
};

function PrimaryCaseList(props: PrimaryCaseListProps) {
    const { recommendedCases, onCaseBookmarked } = props;
    return (
        <div id="primary-case-list">
            <ul className="list-group justify-content-center">
                {recommendedCases.map((opinion) => (
                    <li className="list-group-item primary-case-li">
                        <div className="flex-primary-case-list-item">
                            <div className="primary-case-list-item-name">
                                <OpinionDisplay opinion={opinion} />
                            </div>
                            <div className="primary-case-list-item-actions">
                                <Button
                                    variant="primary"
                                    className="primary-case-list-trash-btn"
                                    size="sm"
                                    onClick={() => onCaseBookmarked(opinion)}
                                >
                                    {' '}
                                    <Bookmark />
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

export default PrimaryCaseList;

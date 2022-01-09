import React from 'react';
import Opinion, { fullCaseName } from '../interfaces/Opinion';
import './OpinionDisplay.scss';
import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

type OpinionDisplayProps = {
    opinion: Opinion;
}

function OpinionDisplay(props: OpinionDisplayProps) {
    const { opinion } = props;
    return (
        <div>
            {' '}
            { fullCaseName(opinion) }
            {' '}
        </div>
    );
}

export default OpinionDisplay;

import React, { Component } from 'react';
import Opinion, { fullCaseName } from '../interfaces/Opinion'
import CaseService from '../services/CaseService'
import './OpinionDisplay.scss';
import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

type OpinionDisplayProps = {
    opinion: Opinion;
}

function OpinionDisplay(props: OpinionDisplayProps) {
    return <div> { fullCaseName(props.opinion) } </div>;
}
export default OpinionDisplay;

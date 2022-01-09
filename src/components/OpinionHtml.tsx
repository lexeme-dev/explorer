import React, { Component } from 'react';
import Opinion, { fullCaseName } from '../interfaces/Opinion'
import CaseService from '../services/CaseService'
import { Button } from 'react-bootstrap';
import { XSquare } from 'react-bootstrap-icons';
import './OpinionHtml.scss';
import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OnCaseDisplayed } from './App';

type OpinionHtmlProps = {
    opinion: Opinion;
    onCaseDisplayed: OnCaseDisplayed;
}

type OpinionHtmlState = {
    html: string;
}

class OpinionHtml extends Component<OpinionHtmlProps, OpinionHtmlState> {
  constructor (props: OpinionHtmlProps) {
    super(props)
    this.state = { html: "" }
  }

  componentDidMount() {
    var cs: CaseService = new CaseService()
	cs.getCaseHtml(this.props.opinion).then(response => this.setState({html: response}));
  }

  render () {
    const { html } = this.state;
    return html ? <div className="opinion-html"> <Button id="recommendation-return-button" variant="link" onClick={() => this.props.onCaseDisplayed(undefined)}> <XSquare /> </Button> <div dangerouslySetInnerHTML={{ __html: html }} /> </div> : (
      <span>Loading case text...</span>
    );
  }
}

export default OpinionHtml;

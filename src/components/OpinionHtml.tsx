import React, { Component } from 'react';
import Opinion, { fullCaseName } from '../interfaces/Opinion'
import CaseService from '../services/CaseService'
import { Button, Card } from 'react-bootstrap';
import { Bookmark, ArrowLeft } from 'react-bootstrap-icons';
import './OpinionHtml.scss';
import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OnCaseDisplayed, OnCasesBookmarked } from './App';

type OpinionHtmlProps = {
    opinion: Opinion;
    onCaseDisplayed: OnCaseDisplayed;
    onCaseBookmarked: OnCasesBookmarked;
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
    if (html) {
      return (
        <Card className="opinion-html-container">
          <Card.Header className="opinion-html-header">
            <Button className="opinion-html-button" variant="secondary" onClick={() => this.props.onCaseDisplayed(undefined)}>
              <ArrowLeft />
            </Button>
            <Button variant="primary" className="opinion-html-button" onClick={() => this.props.onCaseBookmarked(this.props.opinion)}>
              <Bookmark />
            </Button>
          </Card.Header>
          <Card.Body>
            <div className="opinion-html">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </Card.Body>
        </Card>
      );
    } else {
      return (<span>Loading case text...</span>);
    }
  }
}

export default OpinionHtml;

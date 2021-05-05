import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CaseSearch from "./CaseSearch";
import Opinion, {fullCaseName} from "../interfaces/Opinion";
import CaseService from "../services/CaseService";
import Spinner from "react-bootstrap/Spinner";
import {PlusSquare, XSquare} from "react-bootstrap-icons";
import {Button} from "react-bootstrap";

type CaseAction = (opinion: Opinion) => void
export type OnCaseAdded = CaseAction
export type OnCaseRemoved = CaseAction

type AppState = {
    selectedCases: Opinion[],
    recommendations: Opinion[],
    recommendationsLoading: boolean;
}

class App extends Component<{}, AppState> {
    caseService: CaseService;

    constructor(props: {}) {
        super(props);
        this.state = {selectedCases: [], recommendations: [], recommendationsLoading: false};
        this.caseService = new CaseService()
    }


    onCaseAdded: OnCaseAdded = (opinion) => {
        this.setState(prevState => {
            return {selectedCases: prevState.selectedCases.concat(opinion)}
        }, () => this.loadRecommendations());
    }

    onCaseRemoved: OnCaseRemoved = (opinion) => {
        this.setState(prevState => {
            return {selectedCases: prevState.selectedCases.filter(op => op.id !== opinion.id)};
        }, () => this.loadRecommendations());
    }

    loadRecommendations = () => {
        this.setState({recommendationsLoading: true});
        this.caseService.getSimilarCases(this.state.selectedCases, 5)
            .then(recommendations => this.setState({recommendations, recommendationsLoading: false}))
            .catch(_ => this.setState({recommendations: [], recommendationsLoading: false}));
    }

    render() {
        return (
            <div className="App">
                <h3>Find Cases</h3>
                <div className="search-box">
                    <CaseSearch selectedCases={this.state.selectedCases} onCaseSelected={this.onCaseAdded}/>
                </div>
                <br/>
                <div className="selected-cases">
                    <h3>Currently Selected Cases</h3>
                    {this.state.selectedCases.map(opinion =>
                        <div key={opinion.id}>
                            {fullCaseName(opinion)} &nbsp;
                            <Button style={{color: "red"}} variant="link" size="sm" onClick={() => this.onCaseRemoved(opinion)}>
                                <XSquare className="align-text-top"/>
                            </Button>
                        </div>
                    )}
                </div>
                <br/>
                <div className="case-recommendations">
                    <h3>Recommendations</h3>
                    {this.state.recommendationsLoading ?
                        <Spinner animation="border" role="status"/> :
                        this.state.recommendations.map(rec =>
                            <div key={rec.id}>
                                {fullCaseName(rec)}
                                <Button variant="link" size="sm" onClick={() => this.onCaseAdded(rec)}>
                                    <PlusSquare className="align-text-top"/>
                                </Button>
                            </div>
                        )}
                </div>
            </div>
        );
    }

}

export default App;

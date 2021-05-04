import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CaseSearch from "./CaseSearch";
import Opinion from "../interfaces/Opinion";
import CaseService from "../services/CaseService";

export type OnCaseSelected = (opinion: Opinion) => void

type AppState = {
    selectedCases: Opinion[],
    recommendations: Opinion[],
}

class App extends Component<{}, AppState> {
    caseService: CaseService

    constructor(props: {}) {
        super(props);
        this.state = {selectedCases: [], recommendations: []};
        this.caseService = new CaseService()
    }


    onCaseSelected: OnCaseSelected = (opinion) => {
        this.setState(prevState => {
            return {selectedCases: prevState.selectedCases.concat(opinion)}
        }, () => this.loadRecommendations());
    }

    loadRecommendations = () => {
        this.caseService.getSimilarCases(this.state.selectedCases, 5)
            .then(recommendations => this.setState({recommendations}))
    }

    render() {
        return (
            <div className="App">
                <h3>Find Cases</h3>
                <div className="search-box">
                    <CaseSearch selectedCases={this.state.selectedCases} onCaseSelected={this.onCaseSelected}/>
                </div>
                <br />
                <div className="selected-cases">
                    <h3>Currently Selected Cases</h3>
                    {this.state.selectedCases.map(opinion =>
                        <div key={opinion.id}>
                            {opinion.cluster.case_name}
                        </div>
                    )}
                </div>
                <div className="case-recommendations">
                    <h3>Recommendations</h3>
                    {this.state.recommendations.map(rec =>
                        <div key={rec.id}>
                            {rec.cluster.case_name}
                        </div>
                    )}
                </div>
            </div>
        );
    }

}

export default App;

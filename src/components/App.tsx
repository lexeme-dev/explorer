import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CaseSearch from "./CaseSearch";
import Opinion from "../interfaces/Opinion";

export type OnCaseSelected = (opinion: Opinion) => void

type AppState = {
    selectedCases: Opinion[]
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {selectedCases: []};
    }


    onCaseSelected: OnCaseSelected = (opinion) => {
        this.setState(prevState => {
            return {selectedCases: prevState.selectedCases.concat(opinion)}
        });
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
            </div>
        );
    }

}

export default App;

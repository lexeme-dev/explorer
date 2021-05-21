import React, { Component } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import { PlusSquare, XSquare } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import CaseSearch from './CaseSearch';
import Opinion, { fullCaseName } from '../interfaces/Opinion';
import CaseService from '../services/CaseService';
import PdfUpload from './PdfUpload';
import Header from './Header';
import Sidebar from './Sidebar';

export type OnCasesAdded = (opinion: Opinion | Opinion[]) => void;
export type OnCaseRemoved = (opinion: Opinion) => void;

type AppState = {
    selectedCases: Opinion[];
    recommendations: Opinion[];
    recommendationsLoading: boolean;
};

class App extends Component<{}, AppState> {
    caseService: CaseService;

    constructor(props: {}) {
        super(props);
        this.state = {
            selectedCases: [],
            recommendations: [],
            recommendationsLoading: false,
        };
        this.caseService = new CaseService();
    }

    onCaseAdded: OnCasesAdded = (opinion) => {
        this.setState(
            (prevState) => ({
                selectedCases: prevState.selectedCases.concat(opinion),
            }),
            () => this.loadRecommendations(),
        );
    };

    onCaseRemoved: OnCaseRemoved = (opinion) => {
        this.setState(
            (prevState) => ({
                selectedCases: prevState.selectedCases.filter(
                    (op) => op.id !== opinion.id,
                ),
            }),
            () => this.loadRecommendations(),
        );
    };

    onCasesCleared = () => {
        this.setState({
            selectedCases: [],
            recommendations: [],
            recommendationsLoading: false,
        });
    };

    loadRecommendations = () => {
        this.setState({ recommendationsLoading: true });
        const { selectedCases } = this.state;
        this.caseService
            .getSimilarCases(selectedCases, 5)
            .then((recommendations) => this.setState({
                recommendations,
                recommendationsLoading: false,
            }))
            .catch(() => this.setState({
                recommendations: [],
                recommendationsLoading: false,
            }));
    };

    render() {
        const {
            selectedCases,
            recommendations,
            recommendationsLoading,
        } = this.state;
        return (
            <div className="App">
                <Header />
                <div id="bodyFrame" className="container-fluid p-0">
                    <div id="sidebar-wrapper">
                        <Sidebar opinions={selectedCases} onCaseRemoved={this.onCaseRemoved}/>
                    </div>
                    <div id="page-content-wrapper">
                        <div className="search-box p-2">
                            <CaseSearch
                                selectedCases={selectedCases}
                                onCaseSelected={this.onCaseAdded}
                            />
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="case-recommendations">
                            {recommendationsLoading ? (
                                <Spinner animation="border" role="status" />
                            ) : (
                                recommendations.map((rec) => (
                                    <div key={rec.id}>
                                        {fullCaseName(rec)}
                                        <Button
                                            variant="link"
                                            size="sm"
                                            onClick={() => this.onCaseAdded(rec)}
                                        >
                                            <PlusSquare className="align-text-top" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

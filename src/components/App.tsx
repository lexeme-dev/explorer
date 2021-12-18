import React, { Component } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import { PlusSquare, XSquare } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import CaseSearch from './CaseSearch';
import Header from './Header';
import SelectedCaseList from './SelectedCaseList';
import Opinion, { fullCaseName } from '../interfaces/Opinion';
import CaseService from '../services/CaseService';
import PdfUpload from './PdfUpload';

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
                <div className="search-box">
                    <CaseSearch
                        selectedCases={selectedCases}
                        onCaseSelected={this.onCaseAdded}
                    />
                </div>
                <br />
                <div className="pdf-upload-box">
                    <PdfUpload onCasesExtracted={this.onCaseAdded} />
                </div>
                <br />
                <div className="selected-cases">
                    <SelectedCaseList selectedCases={selectedCases} />
                </div>
                <br />
                <div className="case-recommendations">
                    <h3>Recommendations</h3>
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
        );
    }
}

export default App;

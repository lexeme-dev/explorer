import React, { Component } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import { PlusSquare, XSquare } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import CaseSearch from './CaseSearch';
import Header from './Header';
import PrimaryCaseList from './PrimaryCaseList';
import SelectedCaseList from './SelectedCaseList';
import Opinion, { fullCaseName } from '../interfaces/Opinion';
import CaseService from '../services/CaseService';
import PdfUpload from './PdfUpload';

export type OnCasesBookmarked = (opinion: Opinion | Opinion[]) => void;
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

    onCaseBookmarked: OnCasesBookmarked = (opinion) => {
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
                <div className="flexbar">
                    <div className="sidebar primary-card card">
                        <div className="primary-cases">
                            <SelectedCaseList selectedCases={selectedCases} onCaseRemoved={this.onCaseRemoved} />
                        </div>
                    </div>
                    <div className="mainbar primary-card card">
                        <div className="search-box">
                            <CaseSearch
                                selectedCases={selectedCases}
                                onCaseSelected={this.onCaseBookmarked}
                            />
                        </div>
                        <div className="case-recommendations">
                            {recommendationsLoading ? (
                                <Spinner animation="border" role="status" />
                            ) : (
                                <PrimaryCaseList recommendedCases={recommendations} onCaseBookmarked={this.onCaseBookmarked} searchCases={[]} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

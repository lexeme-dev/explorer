import React, { Component } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import CaseSearch from './CaseSearch';
import Header from './Header';
import PrimaryCaseList from './PrimaryCaseList';
import SelectedCaseList from './SelectedCaseList';
import OpinionHtml from './OpinionHtml';
import Opinion from '../interfaces/Opinion';
import CaseService from '../services/CaseService';

export type OnCasesBookmarked = (opinion: Opinion | Opinion[]) => void;
export type OnCaseRemoved = (opinion: Opinion) => void;
export type OnCaseDisplayed = (opinion: undefined | Opinion) => void;

type AppState = {
    selectedCases: Opinion[];
    recommendations: Opinion[];
    recommendationsLoading: boolean;
    displayedCase: undefined | Opinion;
};

class App extends Component<{}, AppState> {
    caseService: CaseService;

    constructor(props: {}) {
        super(props);
        this.state = {
            selectedCases: [],
            recommendations: [],
            recommendationsLoading: false,
            displayedCase: undefined
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

    onCaseDisplayed: OnCaseDisplayed = (opinion) => {
        this.setState(
            (prevState) => ({
                displayedCase: opinion
            })
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
            .getRecommendedCases(selectedCases, 10)
            .then((recommendations) => this.setState({
                recommendations,
                recommendationsLoading: false,
            }))
            .catch(() => this.setState({
                recommendations: [],
                recommendationsLoading: false,
            }));
    };

    mainPanel = () => {
        const {
            selectedCases,
            recommendations,
            recommendationsLoading,
            displayedCase
        } = this.state;
        if (displayedCase) {
            return ( <OpinionHtml opinion={displayedCase} onCaseDisplayed={this.onCaseDisplayed} onCaseBookmarked={this.onCaseBookmarked} /> );
        }
        else {
            return (
                <div className="case-recommendations">
                    {recommendationsLoading ? (
                        <Spinner animation="border" role="status" />
                    ) : (
                        <PrimaryCaseList
                            recommendedCases={recommendations}
                            onCaseBookmarked={this.onCaseBookmarked}
                            onCaseDisplayed={this.onCaseDisplayed}
                            searchCases={[]}
                        />
                    )}
                </div>
            );
        }
    }

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
                        <CaseSearch
                            selectedCases={selectedCases}
                            onCaseSelected={this.onCaseBookmarked}
                        />
                        { this.mainPanel() }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

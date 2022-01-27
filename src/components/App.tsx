import React, { Component } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import CaseSearch from './CaseSearch';
import Header from './Header';
import PrimaryCaseList from './PrimaryCaseList';
import SelectedCaseList from './SelectedCaseList';
import OpinionHtml from './OpinionHtml';
import Opinion, { courtIdToName } from '../interfaces/Opinion';
import CaseService from '../services/CaseService';

export type OnCasesBookmarked = (opinion: Opinion | Opinion[]) => void;
export type OnCaseRemoved = (opinion: Opinion) => void;
export type OnCaseDisplayed = (opinion: undefined | Opinion) => void;
export type OnCourtSelectionChange = (court_id: string) => void;

type AppState = {
    selectedCases: Opinion[];
    recommendations: Opinion[];
    recommendationsLoading: boolean;
    displayedCase: undefined | Opinion;
    selectedCourts: Set<string>;
};

class App extends Component<{}, AppState> {
    caseService: CaseService;

    constructor(props: {}) {
        super(props);
        let s: Set<string>= new Set()
        Object.keys(courtIdToName).forEach((court_id) => {s.add(court_id)})
        this.state = {
            selectedCases: [],
            recommendations: [],
            recommendationsLoading: false,
            displayedCase: undefined,
            selectedCourts: s,
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
        const { selectedCases, selectedCourts  } = this.state;
        this.caseService
            .getRecommendedCases(selectedCases, selectedCourts, 10)
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

    onCourtSelectionChange = (court_id: string) => {
        if (this.state.selectedCourts.has(court_id)) {
            this.setState( (prevState) => { selectedCourts: prevState.selectedCourts.delete(court_id) }, () => this.loadRecommendations());
        } else {
            this.setState( (prevState) => { selectedCourts: prevState.selectedCourts.add(court_id) }, () => this.loadRecommendations());
        }
        console.log(this.state.selectedCourts)
    }

    render() {
        const {
            selectedCases,
            recommendations,
            recommendationsLoading,
            selectedCourts,
        } = this.state;
        return (
            <div className="App">
                <Header />
                <div className="flexbar">
                    <div className="sidebar primary-card card">
                        <div className="primary-cases">
                            <SelectedCaseList selectedCases={selectedCases} onCaseRemoved={this.onCaseRemoved} onCaseDisplayed={this.onCaseDisplayed} />
                        </div>
                    </div>
                    <div className="mainbar primary-card card">
                        <CaseSearch
                            selectedCases={selectedCases}
                            onCaseSelected={this.onCaseDisplayed}
                            onCourtSelectionChange={this.onCourtSelectionChange}
                            selectedCourts={selectedCourts}
                        />
                        { this.mainPanel() }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

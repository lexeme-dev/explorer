import React, { Component } from 'react';
import Autosuggest, {
    OnSuggestionSelected,
    SuggestionsFetchRequested,
} from 'react-autosuggest';
import { debounce } from 'debounce';
import Spinner from 'react-bootstrap/Spinner';
import Opinion, { OpinionSuggestion } from '../interfaces/Opinion';
import CaseService from '../services/CaseService';
import { OnCasesBookmarked } from './App';
import AutosuggestTheme from './AutosuggestTheme';
import './CaseSearch.scss';

type CaseSearchProps = {
    selectedCases: Opinion[];
    onCaseSelected: OnCasesBookmarked;
};
type CaseSearchState = {
    query: string;
    suggestions: OpinionSuggestion[];
    suggestionsLoading: boolean;
};
const MAX_SUGGESTIONS = 10;

class CaseSearch extends Component<CaseSearchProps, CaseSearchState> {
    caseService: CaseService;

    requestCounter: number;

    constructor(props: CaseSearchProps) {
        super(props);
        this.requestCounter = 0;
        this.state = {
            query: '',
            suggestions: [],
            suggestionsLoading: false,
        };
        this.caseService = new CaseService();
    }

    renderSuggestion = (opinion: OpinionSuggestion): JSX.Element => (
        <span
            className="case-suggestion"
            dangerouslySetInnerHTML={{ __html: opinion.headline }}
        />
    )

    loadSuggestions: SuggestionsFetchRequested = ({ value: queryValue }) => {
        const { selectedCases } = this.props;
        this.requestCounter += 1;
        const currentRequest = this.requestCounter;
        this.setState({ suggestionsLoading: true });
        this.caseService
            .searchCases(queryValue, MAX_SUGGESTIONS)
            .then((opinionResponse) => {
                if (currentRequest === this.requestCounter) {
                    // This filter should eventually be replaced with including the already selected cases in the query.
                    const unselectedResults = opinionResponse.filter(
                        (op) => !selectedCases.some(
                            (selectedOp) => selectedOp.id === op.id,
                        ),
                    );
                    this.setState({
                        suggestions: unselectedResults,
                        suggestionsLoading: false,
                    });
                }
            });
    };

    debouncedLoadSuggestions = debounce(this.loadSuggestions, 200);

    selectSuggestion: OnSuggestionSelected<Opinion> = (_, { suggestion }) => {
        const { onCaseSelected } = this.props;
        onCaseSelected(suggestion);
        this.setState({
            query: '',
            suggestions: [],
        });
    };

    render() {
        const {
            suggestions,
            suggestionsLoading,
            query,
        } = this.state;
        const inputProps: Autosuggest.InputProps<OpinionSuggestion> = {
            placeholder: 'Search for a case...',
            onChange: (_, { newValue }) => this.setState({ query: newValue }),
            value: query,
        };
        return (
            <div className="input-group">
                <Autosuggest
                    inputProps={inputProps}
                    getSuggestionValue={(suggestion) => suggestion.cluster.case_name}
                    renderSuggestion={this.renderSuggestion}
                    onSuggestionsFetchRequested={this.debouncedLoadSuggestions}
                    onSuggestionsClearRequested={() => this.setState({ suggestions: [] })}
                    onSuggestionSelected={this.selectSuggestion}
                    suggestions={suggestions}
                    theme={AutosuggestTheme}
                    highlightFirstSuggestion
                />
                {suggestionsLoading && (
                    <Spinner animation="border" role="status" size="sm" />
                )}
            </div>
        );
    }
}

export default CaseSearch;

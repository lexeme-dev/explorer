import React, { Component } from 'react';
import Autosuggest, {
    OnSuggestionSelected,
    SuggestionsFetchRequested,
} from 'react-autosuggest';
import { debounce } from 'debounce';
import Spinner from 'react-bootstrap/Spinner';
import Opinion, { fullCaseName } from '../interfaces/Opinion';
import CaseService from '../services/CaseService';
import { OnCasesAdded } from './App';
import AutosuggestTheme from './AutosuggestTheme';

type CaseSearchProps = {
    selectedCases: Opinion[];
    onCaseSelected: OnCasesAdded;
};
type CaseSearchState = {
    query: string;
    suggestions: Opinion[];
    suggestionsLoading: boolean;
};
const MAX_SUGGESTIONS = 10;

class CaseSearch extends Component<CaseSearchProps, CaseSearchState> {
    caseService: CaseService;

    requestCounter: number;

    constructor(props: CaseSearchProps) {
        super(props);
        this.requestCounter = 0;
        this.state = { query: '', suggestions: [], suggestionsLoading: false };
        this.caseService = new CaseService();
    }

    renderSuggestion = (opinion: Opinion): JSX.Element => <span>{fullCaseName(opinion)}</span>;

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
        this.setState({ query: '', suggestions: [] });
    };

    render() {
        const { suggestions, suggestionsLoading, query } = this.state;
        const inputProps: Autosuggest.InputProps<Opinion> = {
            placeholder: 'Search for a case...',
            onChange: (_, { newValue }) => this.setState({ query: newValue }),
            value: query,
        };
        return (
            <div>
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
                &nbsp;
                {suggestionsLoading && (
                    <Spinner animation="border" role="status" size="sm" />
                )}
            </div>
        );
    }
}

export default CaseSearch;

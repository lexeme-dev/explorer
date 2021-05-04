import React, {Component} from 'react';
import Autosuggest, {
    OnSuggestionSelected,
    SuggestionsFetchRequested,
} from "react-autosuggest";
import Opinion from "../interfaces/Opinion";
import {debounce} from "debounce";
import CasesService from "../services/CasesService";
import {OnCaseSelected} from "./App";
import AutosuggestTheme from "./AutosuggestTheme";
import Spinner from "react-bootstrap/Spinner";


type CaseSearchProps = {
    selectedCases: Opinion[]
    onCaseSelected: OnCaseSelected
}
type CaseSearchState = {
    query: string;
    suggestions: Opinion[];
    loadingSuggestions: boolean;
}
const MAX_SUGGESTIONS = 10

class CaseSearch extends Component<CaseSearchProps, CaseSearchState> {

    constructor(props: CaseSearchProps) {
        super(props);
        this.state = {query: "", suggestions: [], loadingSuggestions: false}
    }

    renderSuggestion = ({cluster}: Opinion): JSX.Element => {
        let opinionDisplayText = cluster.case_name;
        if (cluster.reporter != null) {
            opinionDisplayText += `, ${cluster.reporter}`;
        }
        opinionDisplayText += ` (${cluster.year})`
        return <span>{opinionDisplayText}</span>
    }

    requestCounter = 0;
    loadSuggestions: SuggestionsFetchRequested = ({value: queryValue}) => {
        this.requestCounter++;
        const currentRequest = this.requestCounter;
        this.setState({loadingSuggestions: true})
        CasesService.searchCases(queryValue, MAX_SUGGESTIONS).then(opinionResponse => {
            if (currentRequest === this.requestCounter) {
                // This filter should eventually be replaced with including the already selected cases in the query.
                const unselectedResults = opinionResponse.filter(op =>
                    !this.props.selectedCases.some(selectedOp => selectedOp.id === op.id));
                this.setState({suggestions: unselectedResults, loadingSuggestions: false})
            }
        })
    }
    debouncedLoadSuggestions = debounce(this.loadSuggestions, 200)

    selectSuggestion: OnSuggestionSelected<Opinion> = (_, {suggestion}) => {
        this.props.onCaseSelected(suggestion);
        this.setState({query: "", suggestions: []});
    }

    render() {
        const inputProps: Autosuggest.InputProps<any> = {
            placeholder: "Search for a case...",
            onChange: (_, {newValue}) => this.setState({query: newValue}),
            value: this.state.query,
        }
        return (
            <div>
                <Autosuggest
                    inputProps={inputProps}
                    getSuggestionValue={suggestion => suggestion.cluster.case_name}
                    renderSuggestion={this.renderSuggestion}
                    onSuggestionsFetchRequested={this.debouncedLoadSuggestions}
                    onSuggestionsClearRequested={() => this.setState({suggestions: []})}
                    onSuggestionSelected={this.selectSuggestion}
                    suggestions={this.state.suggestions}
                    theme={AutosuggestTheme}
                    highlightFirstSuggestion={true}
                >
                </Autosuggest>
                {this.state.loadingSuggestions && <Spinner animation="border" role="status" size="sm"/>}
            </div>
        );
    }

}

export default CaseSearch;

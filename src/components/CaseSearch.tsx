import React, {Component} from 'react';
import Autosuggest, {SuggestionsFetchRequestedParams} from "react-autosuggest";
import Opinion from "../interfaces/Opinion";
import axios from "axios";
import {debounce} from "debounce";
import CasesService from "../services/CasesService";

type CaseSearchProps = {}
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
    loadSuggestions = ({value: queryValue}: SuggestionsFetchRequestedParams) => {
        this.requestCounter++;
        const currentRequest = this.requestCounter;
        this.setState({loadingSuggestions: true})
        CasesService.searchCases(queryValue, MAX_SUGGESTIONS).then(opinionResponse => {
            if (currentRequest === this.requestCounter) {
                this.setState({suggestions: opinionResponse, loadingSuggestions: false})
            }
        })
    }
    debouncedLoadSuggestions = debounce(this.loadSuggestions, 200)

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
                    suggestions={this.state.suggestions}>
                </Autosuggest>
                {this.state.loadingSuggestions && <span>Currently loading...</span>}
            </div>
        );
    }
}

export default CaseSearch;

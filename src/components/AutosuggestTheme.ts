import { Theme } from 'react-autosuggest';

const AutosuggestTheme: Theme = {
    container: {
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        padding: '15px',
    },
    input: {
        width: '100%',
        alignSelf: 'stretch',
        height: 40,
        padding: '10px 20px',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 300,
        fontSize: 16,
        border: '1px solid #aaa',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    inputFocused: {
        outline: 'none',
    },
    inputOpen: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    suggestionsContainer: {
        display: 'none',
    },
    suggestionsContainerOpen: {
        display: 'block',
        width: '100%',
        border: '1px solid #aaa',
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 300,
        fontSize: 16,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        zIndex: 2,
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    suggestion: {
        cursor: 'pointer',
        padding: '10px 20px',
    },
    suggestionHighlighted: {
        backgroundColor: '#ddd',
    },
};

export default AutosuggestTheme;

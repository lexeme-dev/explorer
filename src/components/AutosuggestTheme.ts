import { Theme } from 'react-autosuggest';

const AutosuggestTheme: Theme = {
    container: {
        position: 'relative',
        display: 'block',
        width: '100%',
        padding: '15px',
        alignSelf: 'left',
        alignItems: 'left',
    },
    input: {
        width: '100%',
        alignSelf: 'left',
        maxWidth: '500px',
        height: 40,
        padding: '10px 20px',
        fontWeight: 300,
        fontSize: 16,
        border: '1px solid #aaa',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        alignItems: 'left',
        display: 'block',
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
        position: 'absolute',
        width: '100%',
        border: '1px solid #aaa',
        borderTop: '0px solid #aaa',
        backgroundColor: '#fff',
        maxWidth: '500px',
        alignSelf: 'stretch',
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
} as Theme;

export default AutosuggestTheme;

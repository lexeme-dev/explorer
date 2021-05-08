import { Theme } from "react-autosuggest";

const AutosuggestTheme: Theme = {
    container: {
        position: "relative",
        display: "inline-block",
    },
    input: {
        width: 280,
        height: 40,
        padding: "10px 20px",
        fontFamily: "Helvetica, sans-serif",
        fontWeight: 300,
        fontSize: 16,
        border: "1px solid #aaa",
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    inputFocused: {
        outline: "none",
    },
    inputOpen: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    suggestionsContainer: {
        display: "none",
    },
    suggestionsContainerOpen: {
        display: "block",
        position: "absolute",
        width: 280,
        border: "1px solid #aaa",
        backgroundColor: "#fff",
        fontFamily: "Helvetica, sans-serif",
        fontWeight: 300,
        fontSize: 16,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        zIndex: 2,
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none",
    },
    suggestion: {
        cursor: "pointer",
        padding: "10px 20px",
    },
    suggestionHighlighted: {
        backgroundColor: "#ddd",
    },
};

export default AutosuggestTheme;

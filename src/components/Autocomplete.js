import SuggestionsListComponent from "./SuggestionsListComponent"

const Autocomplete = (props) => {

    return (
        <div className="container">
            <input
                type="text"
                onChange={props.onChange}
                value={props.input}
            />
            {props.showSuggestions && props.input &&
                <SuggestionsListComponent
                    requestStatus={props.requestStatus}
                    avatarArray={props.avatarArray}
                    onClick={props.onClick}
                    activeSuggestionIndex={props.activeSuggestionIndex}
                    filteredSuggestions={props.filteredSuggestions} />}
        </div>
    );

};

export default Autocomplete;
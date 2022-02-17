

const SuggestionsListComponent = (props) => {
  return props.filteredSuggestions.length ? (
    <div className="suggestions">
      {props.filteredSuggestions.map((suggestion, index) => {

        return (
          <div
            className="suggestionactive" key={suggestion} onClick={props.onClick}>
            <div className="nameContainer">
              {suggestion}
            </div>
            <div className="avatarContainer">
              <img className="avatarImg" src={props.avatarArray[index]} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="noSuggestions">
      user not found
    </div>
  );
};
export default SuggestionsListComponent;
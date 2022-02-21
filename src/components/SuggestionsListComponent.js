
const SuggestionsListComponent = (props) => {
  if (!props.requestStatus) {
    return <div className="noSuggestions">
      Request Limit Exeeded, Try Later
    </div>
  }
  return props.filteredSuggestions.length ? (
    <div className="suggestions">
      {props.filteredSuggestions.map((suggestion, index) => {

        return (
          <div
            className="suggestionactive" key={suggestion} onClick={props.onClick}>
            <div className="avatarContainer">
              <img className="avatarImg" src={props.avatarArray[index]} alt="" />
            </div>
            <div className="nameContainer">
              {suggestion}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="noSuggestions">

    </div>
  );
};
export default SuggestionsListComponent;
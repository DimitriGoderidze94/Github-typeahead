import Autocomplete from './components/Autocomplete';
import React, { useEffect, useState } from "react";

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const [avatarArray, setAvatarArray] = useState([]);
  const [requestStatus, setRequestStatus] = useState(true)
  const [timer, setTimer] = useState(null);



  useEffect(() => {

    if (input !== "") {
      fetch("https://api.github.com/search/users?q=" + input + "&per_page=100", {

      }
      )
        .then(response => response.json())
        .then(data => {
          let nameArr = [];
          let avatarArr = [];
          if (data.message) {
            setRequestStatus(false)
          } else {
            if (data["items"]) {
              for (let i = 0; i < data["items"].length; i++) {
                if (data["items"][i]["login"].toLowerCase().includes(input.toLowerCase())) {
                  nameArr.push(data["items"][i]["login"]);
                  avatarArr.push(data["items"][i]["avatar_url"])
                }
              }
            }
            setRequestStatus(true);
          }
          setAvatarArray(avatarArr.slice(0, 7));
          setSuggestions(nameArr.slice(0, 7));
        })
    }


  }, [input])

  useEffect(() => {
    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  }, [suggestions, input])




  const onChange = (e) => {

    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        setInput(e.target.value);
      }, 500)
    );
  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
    window.open('https://github.com/' + e.target.innerText)
  };




  return (
    <div>
      <h1>Github Typeahead</h1>
      <br />
      <Autocomplete
        requestStatus={requestStatus}
        avatarArray={avatarArray}
        onChange={onChange}
        onClick={onClick}
        suggestions={suggestions}
        filteredSuggestions={filteredSuggestions}
        activeSuggestionIndex={activeSuggestionIndex}
        showSuggestions={showSuggestions}
        input={input}
      />
    </div>
  );
}

export default App;

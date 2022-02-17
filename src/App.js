import Autocomplete from './components/Autocomplete';
import React, { useEffect, useState } from "react";


function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const [avatarArray, setAvatarArray] = useState([]);

  useEffect(() => {
    if (input != "") {
      fetch("https://api.github.com/search/users?q=" + input, {
        headers: {

        },
        name: input
      }
      )
        .then(response => response.json())
        .then(data => {
          let nameArr = [];
          let avatarArr = [];
          for (let i = 0; i < data["items"].length; i++) {
            if (data["items"][i]["login"].toLowerCase().includes(input.toLowerCase())) {
              nameArr.push(data["items"][i]["login"]);
              avatarArr.push(data["items"][i]["avatar_url"])
            }
          }
          console.log(nameArr)
          const filtered = nameArr.filter(
            (name) =>
              name.toLowerCase().includes(input.toLowerCase())
          );
          setAvatarArray(avatarArr.slice(0, 4));
          setSuggestions(nameArr.slice(0, 4));
        })
    }
  }, [input])

  useEffect(() => {

    const unLinked = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  }, [suggestions])




  const onChange = (e) => {
    setInput(e.target.value);
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
      <h1>Github typeahead</h1>
      <Autocomplete
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

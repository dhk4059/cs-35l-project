//credit to the PedroTech youtube channel and specifically video URL https://www.youtube.com/watch?v=x7niho285qs for
//helping build the skeleton of the search function
import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

//note the placeholder is the text that will appear in the box and the data should be
// the dictionary passed in to be parsed
function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);//sets up the filtereddata array and the function call to edit it with useState
  const [wordEntered, setWordEntered] = useState("");//sets up the user input string and function call to edit it

  const handleFilter = (event) => {//this function essentially runs everytime the user changes the search bar input
    const searchWord = event.target.value;//sets searchword to be whats inside the bar
    setWordEntered(searchWord);
    //the filter function takes an array, and iterates through it
    //in this case newFilter represents an array of results where an entry in the data inlcudes the search bar input anywhere
    const newFilter = Object.values(data).filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);//resets filterData if there is no input in the searchbar
    } else {
      // console.log(newFilter);
      setFilteredData(newFilter);//now the data that should be shown is the ones that got output by filter.
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={(event) => {
            event.preventDefault();
            handleFilter();
          }}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon
              id="clearBtn"
              onClick={(event) => {
                event.preventDefault();
                clearInput();
              }}
            />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a
                key={key}
                className="dataItem"
                href={value.link}
                target="_blank"
              >
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

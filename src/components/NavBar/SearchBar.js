import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Search bar element that parses through 'titles' array
// for matches from the user's search query string,
// showing an overlay list of the results.

const SearchBar = ({ titles }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <input
        style={{
          border: "0px",
          borderRadius: "6px",
          marginTop: "10px",
          width: "70vw",
          maxWidth: "350px",
          height: "30px",
          paddingInline: "15px",
          fontWeight: "bold",
          outline: "none",
        }}
        maxLength={50}
        value={search}
        type="text"
        placeholder="Search dorm names..."
        onChange={(event) => {
          // search functionality:
          event.preventDefault();
          let searchString = event.target.value;
          setSearch(searchString);
          let results = [];
          searchString = searchString.trim();
          if (searchString.length > 0) {
            searchString = searchString.toLowerCase().trim();
            titles.forEach((title) => {
              if (title.toLowerCase().includes(searchString)) {
                results.push(title);
              }
            });
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          setSearchResults(results);
        }}
      />
      <div
        style={{
          width: "70vw",
          maxWidth: "350px",
          maxHeight: "300px",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "white",
          borderRadius: "6px",
          overflowY: "auto",
          visibility: isVisible ? "visible" : "hidden",
          zIndex: "9",
        }}
      >
        {searchResults.length > 0
          ? searchResults.map((searchResult, index) => {
              return (
                <div
                  className="searchResults"
                  key={index}
                  style={{
                    paddingLeft: "15px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: "bold",
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    setSearch("");
                    setSearchResults([]);
                    navigate(
                      "/housing/" + searchResult.replace(" ", "-").toLowerCase()
                    );
                  }}
                >
                  {searchResult}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SearchBar;

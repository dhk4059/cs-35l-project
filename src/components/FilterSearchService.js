import { useState } from "react";
import { Container, Card, DropdownButton, Dropdown } from "react-bootstrap";
import { db } from "../util/firebaseConfig";
import {
  onValue,
  ref,
  orderByChild,
  query,
  limitToLast,
} from "firebase/database";

const FilterSearchService = () => {
  var [show, setShow] = useState(0);
  var [filter, setFilter] = useState("");
  var [housing, setHousing] = useState([]);

  const searchResults = (searchFilter) => {
    // get data
    onValue(
      query(ref(db, "ratings"), orderByChild(searchFilter), limitToLast(10)),
      (snapshot) => {
        var housing = new Array(snapshot.size);
        var i = snapshot.size - 1;
        snapshot.forEach((child) => {
          housing[i] = child.val();
          i -= 1;
        });
        setShow(1);
        setFilter(searchFilter);
        setHousing(housing);
        console.log(housing);
      }
    );
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        <h2>Filter Search Example using Firebase Database</h2>
        <br />
        <h3>Choose a Filter:</h3>
        <DropdownButton
          id="dropdown-basic-button"
          title="Filter"
          menuVariant="dark"
        >
          <Dropdown.Item onClick={() => searchResults("overallRating")}>
            <h3>Overall Rating</h3>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => searchResults("essentialsQuality")}>
            <h3>Quality of Essentials</h3>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => searchResults("foodAccess")}>
            <h3>Access to Food</h3>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => searchResults("noiseLevel")}>
            <h3>Noise Level</h3>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => searchResults("parkingProximity")}>
            <h3>Proximity to Parking</h3>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => searchResults("uclaProximity")}>
            <h3>Proximity to Campus</h3>
          </Dropdown.Item>
        </DropdownButton>
        <br />
        <div style={{ overflowY: "auto" }}>
          {show ? (
            housing.map((attr, idx) => (
              <Card
                className="text-left mt-3"
                key={idx}
                style={{ width: "25rem", height: "25rem", border: "3px solid" }}
              >
                <Card.Body>
                  <Card.Title>
                    <h1>{attr["title"]}</h1>
                  </Card.Title>
                  <h3
                    style={{
                      color: filter === "overallRating" ? "red" : "black",
                    }}
                  >
                    {"Overall Rating: " + attr["overallRating"]}
                  </h3>
                  <br />
                  <h5
                    style={{
                      color: filter === "essentialsQuality" ? "red" : "black",
                    }}
                  >
                    {"Quality of Essentials: " + attr["essentialsQuality"]}
                  </h5>
                  <h5
                    style={{
                      color: filter === "foodAccess" ? "red" : "black",
                    }}
                  >
                    {"Access to Food: " + attr["foodAccess"]}
                  </h5>
                  <h5
                    style={{
                      color: filter === "noiseLevel" ? "red" : "black",
                    }}
                  >
                    {"Noise Level: " + attr["noiseLevel"]}
                  </h5>
                  <h5
                    style={{
                      color: filter === "parkingProximity" ? "red" : "black",
                    }}
                  >
                    {"Proximity to Parking: " + attr["parkingProximity"]}
                  </h5>
                  <h5
                    style={{
                      color: filter === "uclaProximity" ? "red" : "black",
                    }}
                  >
                    {"Proximity to Campus: " + attr["uclaProximity"]}
                  </h5>
                </Card.Body>
              </Card>
            ))
          ) : (
            <h3>Choose an Option</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSearchService;

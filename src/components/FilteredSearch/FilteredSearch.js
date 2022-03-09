import { useState } from "react";
import { Card, DropdownButton, Dropdown } from "react-bootstrap";
import { db } from "../../util/firebaseConfig";
import { onValue, ref, orderByChild, query } from "firebase/database";

import { Link } from "react-router-dom";

const FilteredSearch = () => {
  const [show, setShow] = useState(false);
  const [housing, setHousing] = useState([]);
  const [topFilter, setTopFilter] = useState([
    "overallRating",
    "Overall Quality: ",
  ]);
  const initialOrder = [
    ["overallRating", "Overall Quality: "],
    ["essentialsQuality", "Quality of Essentials: "],
    ["foodAccess", "Access to Food: "],
    ["noiseLevel", "Noise Level: "],
    ["parkingProximity", "Proximity to Parking: "],
    ["uclaProximity", "Proximity to Campus: "],
  ];
  const [order, setOrder] = useState(initialOrder.slice(1, 6));

  const searchResults = (searchFilter) => {
    // get data
    const unsubscribe = onValue(
      query(ref(db, "filterDB"), orderByChild(searchFilter)),
      (snapshot) => {
        let housing = new Array(snapshot.size);
        let i = snapshot.size - 1;
        snapshot.forEach((child) => {
          housing[i] = child.val();
          i -= 1;
        });

        // look for filter in initialOrder, get the index, and remove the element in filters
        // then replace topFilter with the temp
        let filters = initialOrder;
        for (let i = 0; i < initialOrder.length; i++) {
          if (searchFilter === initialOrder[i][0]) {
            let temp = initialOrder[i];
            filters.splice(i, 1);
            setTopFilter(temp);
            setOrder(filters);
            break;
          }
        }

        setShow(true);
        setHousing(housing);
      }
    );
    return unsubscribe;
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        <center>
          <DropdownButton
            id="dropdown-basic-button"
            title="Choose a Filter"
            menuVariant="dark"
          >
            <Dropdown.Item onClick={() => searchResults("overallRating")}>
              <h4>Overall Quality</h4>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => searchResults("essentialsQuality")}>
              <h4>Quality of Essentials</h4>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => searchResults("foodAccess")}>
              <h4>Access to Food</h4>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => searchResults("noiseLevel")}>
              <h4>Noise Level</h4>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => searchResults("parkingProximity")}>
              <h4>Proximity to Parking</h4>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => searchResults("uclaProximity")}>
              <h4>Proximity to Campus</h4>
            </Dropdown.Item>
          </DropdownButton>
          <br />
        </center>
        <div>
          {show ? (
            housing.map((attr, idx) => (
              <center key={idx}>
                <Card
                  className="text-left mt-3"
                  key={idx}
                  style={{
                    width: "25rem",
                    height: "23rem",
                    borderRadius: "20px",
                  }}
                >
                  <Card.Body>
                    <div style={{ borderBottom: "solid 2px" }}>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/" + attr["title"].replace(" ", "-").toLowerCase()}
                      >
                        <h1>{attr["title"]}</h1>
                      </Link>
                    </div>
                    <br />
                    <h3 style={{ color: "red" }}>
                      {topFilter[1] + attr[topFilter[0]]}
                    </h3>
                    <br />
                    {order.map((filterPair) => {
                      return (
                        <h4 key={filterPair[0]}>
                          {filterPair[1] + attr[filterPair[0]]}
                        </h4>
                      );
                    })}
                  </Card.Body>
                </Card>
              </center>
            ))
          ) : (
            <div style={{ height: "100vh" }}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteredSearch;

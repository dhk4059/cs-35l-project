import { useEffect, useState, useRef } from "react";
import { Card } from "react-bootstrap";
import { db } from "../../util/firebaseConfig";
import { onValue, ref, orderByChild, query } from "firebase/database";
import DropDownFilter from "./DropDownFilter";
import { Link } from "react-router-dom";

// Filtered Search page
// User chooses a filter to sort by, and a backend DB call returns
// a list of dorms ordered by the chosen filter from highest to lowest rating.
// This list is then displayed using a programmatically generated list of
// cards.

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
  const [searchFilter, setSearchFilter] = useState("overallRating");
  const [choseFilter, setChoseFilter] = useState(false);

  // We use useRef() in order to preserve the reference to initialOrder
  // without creating a new one to avoid chance of mem leak.
  const orderRef = useRef(initialOrder);

  const searchResults = (filter) => {
    setSearchFilter(filter);
    setChoseFilter(true);
  };

  useEffect(() => {
    if (choseFilter) {
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
          let filters = orderRef;
          for (let i = 0; i < orderRef.length; i++) {
            if (searchFilter === orderRef[i][0]) {
              let temp = orderRef[i];
              filters.splice(i, 1);
              setTopFilter(temp);
              setOrder(filters);
              break;
            }
          }
          setChoseFilter(false);
          setShow(true);
          setHousing(housing);
        }
      );
      return unsubscribe;
    } else {
      return () => {};
    }
  }, [searchFilter, choseFilter]);

  // render the dropdown and the cards once the ordered list has data
  return (
    <div className="d-flex justify-content-center">
      <div>
        <DropDownFilter setFilter={searchResults}></DropDownFilter>
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
                        to={"/housing/" + attr["title"].replace(" ", "-").toLowerCase()}
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

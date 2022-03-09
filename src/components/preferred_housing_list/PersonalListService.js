import { useState, useEffect } from "react";
import { Row, Col, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { auth, db } from "../../util/firebaseConfig";
import { onValue, ref, set } from "firebase/database";
import Loading from "../Loading";
import ListView from "./ListView";

const PersonalListService = () => {
  const user = auth.currentUser;
  const [prefs, setPrefs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isViewList, setIsViewList] = useState(true);
  const [listNum, setListNum] = useState(0);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  // const [makePrefs, setMakePrefs] = useState([])

  const updateList = () => {
    // console.log(prefs[listNum]);
    set(ref(db, "userPrefs/" + user.uid + "/" + listNum), prefs[listNum]);
  };

  const updateButton = () => {
    setShowUpdateButton(true);
  };

  const updatePrefs = (newPrefs) => {
    let tempPrefs = prefs;
    tempPrefs[listNum] = newPrefs;
    setPrefs(tempPrefs);
  };

  useEffect(() => {
    onValue(ref(db, "userPrefs/" + user.uid + ""), (snapshot) => {
      try {
        const data = snapshot.val();

        console.log(data);
        console.log("DB CALL");
        setPrefs(data);
        setLoading(false);
        // data.map((index, keys) => {
        //   console.log(index)
        //   console.log(keys)
        // })
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    });
    return () => {};
  }, [user.uid, setListNum]);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="justify-content-right" style={{ minHeight: "75vh" }}>
      <div style={{ marginBottom: "30px" }}>
        <h1 className="text-center" style={{ textDecoration: "underline" }}>
          Preferred Housing List
        </h1>
      </div>
      <Row>
        <Col md={7}>
          <h2 className="text-center">Pick a List:</h2>
        </Col>
        <Col md={5}>
          {prefs !== null && isViewList ? (
            <DropdownButton
              align="end"
              id="dropdown-basic-button"
              title="List Number"
              menuVariant="dark"
            >
              {prefs.map((_, index) => {
                return (
                  <Dropdown.Item
                    key={index + 1}
                    onClick={() => setListNum(index)}
                  >
                    <h5>{index + 1}</h5>
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          ) : null}
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <div className="d-flex align-items-center justify-content-center">
        <center>
          <Button
            onClick={() => setIsViewList(true)}
            variant={isViewList ? "primary" : "outline-primary"}
            style={{ width: "25vh" }}
          >
            <h2 className="text-center">View List</h2>
          </Button>
        </center>
        <center>
          <Button
            onClick={() => setIsViewList(false)}
            variant={!isViewList ? "success" : "outline-success"}
            style={{ width: "25vh" }}
          >
            <h2 className="text-center">Make List</h2>
          </Button>
        </center>
      </div>
      <center>
        <div
          className="d-flex justify-content-center"
          style={{
            width: "75vh",
            backgroundColor: "lightblue",
          }}
        >
          {prefs !== null ? (
            <ListView
              prefs={isViewList ? prefs[listNum] : []}
              choice={isViewList}
              columnOrder={isViewList ? ["0"] : ["0", "1"]}
              listChoice={listNum}
              currentUser={user}
              showButton={updateButton}
              newPrefs={updatePrefs}
            ></ListView>
          ) : (
            <ListView
              prefs={[]}
              choice={isViewList}
              columnOrder={isViewList ? ["0"] : ["0", "1"]}
              listChoice={listNum}
              currentUser={user}
              showButton={updateButton}
              newPrefs={updatePrefs}
            ></ListView>
          )}
        </div>
        <div style={{ height: "50px", padding: "8px", marginTop: "16px" }}>
          {showUpdateButton && isViewList ? (
            <Button onClick={updateList}>
              <h5>Update Your List</h5>
            </Button>
          ) : null}
        </div>
      </center>
      <div style={{ marginTop: "50px" }}>
        - Edit List will have a "column" represented by trash can symbol within
        a div, where dropping stuff into the trashcan deletes the item from the
        list
      </div>
      <div>- Make List should add a new list, not edit existing lists</div>
      <div>- lists should be scrollable containers</div>
      <div>- random generate data for all housingKeys in python</div>
    </div>
  );
};

export default PersonalListService;

import { useState, useEffect } from "react";
import { Row, Col, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { auth, db } from "../../util/firebaseConfig";
import { onValue, ref, set } from "firebase/database";
import Loading from "../Loading";
import ListView from "./ListView";
import housingData from "../../util/housingData";

const PersonalListService = () => {
  const user = auth.currentUser;
  const [prefs, setPrefs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isViewList, setIsViewList] = useState(true);
  const [listNum, setListNum] = useState(0);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showEditListButton, setShowEditListButton] = useState(false);
  const [showMakeListButton, setShowMakeListButton] = useState(false);
  const [makePrefs, setMakePrefs] = useState([]);
  const [housingKeys, setHousingKeys] = useState(Object.keys(housingData));

  const updateList = () => {
    console.log(prefs[listNum]);
    console.log("list updated");
    // set(ref(db, "userPrefs/" + user.uid + "/" + listNum), prefs[listNum]);
  };

  const makeList = () => {
    console.log(makePrefs);
    console.log("list made");
  };

  const updateButton = () => {
    setShowUpdateButton(true);
  };

  const updatePrefs = (newPrefs) => {
    let tempPrefs = prefs;
    tempPrefs[listNum] = newPrefs;
    setPrefs(tempPrefs);
    setShowEditListButton(true);
  };

  const updateMakePrefs = (newPrefs) => {
    setMakePrefs(newPrefs);
    setShowMakeListButton(true);
  };

  const updateHousing = (newHousing) => {
    setHousingKeys(newHousing);
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
            // height: "50vh",
            backgroundColor: "lightblue",
          }}
        >
          {prefs !== null ? (
            <ListView
              prefs={isViewList ? prefs[listNum] : []}
              makePrefs={!isViewList ? makePrefs : []}
              choice={isViewList}
              columnOrder={isViewList ? ["0"] : ["0", "1"]}
              listChoice={listNum}
              showButton={updateButton}
              newPrefs={updatePrefs}
              newMakePrefs={updateMakePrefs}
              housingData={housingKeys}
              newHousing={updateHousing}
            ></ListView>
          ) : (
            <ListView
              prefs={[]}
              makePrefs={!isViewList ? makePrefs : []}
              choice={isViewList}
              columnOrder={isViewList ? ["0"] : ["0", "1"]}
              listChoice={listNum}
              showButton={updateButton}
              newPrefs={updatePrefs}
              newMakePrefs={updateMakePrefs}
              housingData={housingKeys}
              newHousing={updateHousing}
            ></ListView>
          )}
        </div>
        <div style={{ height: "50px", padding: "8px", marginTop: "16px" }}>
          {showUpdateButton && showEditListButton && isViewList ? (
            <Button onClick={updateList}>
              <h5>Update List</h5>
            </Button>
          ) : showUpdateButton && showMakeListButton && !isViewList ? (
            <Button onClick={makeList}>
              <h5>Make List</h5>
            </Button>
          ) : null}
        </div>
      </center>
      <div>- random generate data for all housingKeys in python</div>
    </div>
  );
};

export default PersonalListService;

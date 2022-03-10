import { useState, useEffect } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { auth, db } from "../../util/firebaseConfig";
import { onValue, ref, set } from "firebase/database";
import Loading from "../Misc/Loading";
import ListView from "./ListView";

// Preferred Housing Main Page
// Gets list of dorm names from index.js via Route 
// The list of preferred housing is read from DB
// to create a list of elements.
// Users can make multiple lists and create new lists.

const HousingList = ({ housingData }) => {
  const housingTitles = [];
  // Perform a deep copy of housingData so that 
  // housingData, which should only supply the data,
  // doesn't get altered.
  housingData.forEach((element) => {
    housingTitles.push(element);
  })
  const user = auth.currentUser;
  const [prefs, setPrefs] = useState([]);
  const [makePrefs, setMakePrefs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isViewList, setIsViewList] = useState(true);
  const [listNum, setListNum] = useState(0);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showEditListButton, setShowEditListButton] = useState(false);
  const [showMakeListButton, setShowMakeListButton] = useState(false);
  const [disableMakeListButton, setDisableMakeListButton] = useState(false);
  const [housingKeys, setHousingKeys] = useState(housingTitles);

  const disableButton = () => {
    if (prefs !== null) {
      let tempHousing = housingTitles;
      prefs[listNum].forEach((element) => {
        tempHousing.splice(tempHousing.indexOf(element), 1);
      });
      setHousingKeys(tempHousing);
      setDisableMakeListButton(true);
    }
  };

  const updateList = () => {
    // console.log(prefs[listNum]);
    // console.log("list updated");
    if (disableMakeListButton) {
      // if true, then we are addinousingTitles);
      // console.log(housingData);g stuff to our list and have to refresh housingKeys when done
      // console.log(h
      setHousingKeys(housingTitles);
      setMakePrefs([]);
      setDisableMakeListButton(false);
    }
    // console.log(housingTitles);
    if (prefs[listNum].length > 0) {
      set(ref(db, "userPrefs/" + user.uid + "/" + listNum), prefs[listNum]);
    } else {
      alert(
        "Error: Cannot leave a list completely empty. Please reload the page to continue."
      );
    }
    setShowEditListButton(false);
  };

  const makeList = () => {
    // console.log(makePrefs);
    // console.log("list made");
    if (prefs !== null) {
      set(ref(db, "userPrefs/" + user.uid + "/" + prefs.length), makePrefs);
      setMakePrefs([]);
      setShowMakeListButton(false);
      setHousingKeys(housingTitles);
    } else {
      set(ref(db, "userPrefs/" + user.uid + "/0"), makePrefs);
      setMakePrefs([]);
      setShowMakeListButton(false);
      setHousingKeys(housingTitles);
    }
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
    const unsubscribe = onValue(
      ref(db, "userPrefs/" + user.uid),
      (snapshot) => {
        try {
          const data = snapshot.val();

          // console.log(data);
          // console.log("DB CALL");
          setPrefs(data);
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, [user.uid, setShowEditListButton]);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <center>
        <div
          style={{
            marginBottom: "50px",
          }}
        >
          <h2 className="text-center" style={{ fontWeight: "bold" }}>
            {isViewList
              ? prefs !== null
                ? "Pick a List to View or Edit:"
                : "Create a New List:"
              : "Create a New List:"}
          </h2>
          {prefs !== null ? (
            <div>
              <DropdownButton
                id="dropdown-basic-button"
                title={"Preferred List #" + (listNum + 1)}
                menuVariant="dark"
                size="lg"
                style={{ visibility: isViewList ? "visible" : "hidden" }}
              >
                {prefs.map((_, index) => {
                  return (
                    <Dropdown.Item
                      key={index + 1}
                      onClick={(event) => {
                        event.preventDefault();
                        setListNum(index);
                        setHousingKeys(housingTitles);
                        setMakePrefs([]);
                        setDisableMakeListButton(false);
                      }}
                    >
                      <h5>{index + 1}</h5>
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </div>
          ) : (
            <div style={{ height: "94px" }}></div>
          )}
        </div>
      </center>
      <div style={{ height: "75vh" }}>
        <div className="d-flex align-items-center justify-content-center">
          <center>
            <Button
              onClick={(event) => {
                event.preventDefault();
                setIsViewList(true);
              }}
              variant={isViewList ? "primary" : "outline-primary"}
              style={{ width: "25vh", maxWidth: "15rem" }}
            >
              <h2 className="text-center">View List</h2>
            </Button>
          </center>
          <center>
            <Button
              onClick={(event) => {
                event.preventDefault();
                setIsViewList(false);
              }}
              variant={!isViewList ? "primary" : "outline-primary"}
              style={{ width: "25vh", maxWidth: "15rem" }}
              disabled={disableMakeListButton}
            >
              <h2 className="text-center">Create List</h2>
            </Button>
          </center>
        </div>
        <center>
          <div
            className="d-flex justify-content-center"
            style={{
              width: "50vh",
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
                disableMakeList={disableButton}
                isMakeDisabled={disableMakeListButton}
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
                disableMakeList={disableButton}
                isMakeDisabled={disableMakeListButton}
              ></ListView>
            )}
          </div>
          <div style={{ height: "50px", padding: "8px", marginTop: "16px" }}>
            {showUpdateButton && showEditListButton && isViewList ? (
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  updateList();
                }}
              >
                <h5>Update List</h5>
              </Button>
            ) : showUpdateButton && showMakeListButton && !isViewList ? (
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  makeList();
                }}
              >
                <h5>Create List</h5>
              </Button>
            ) : null}
          </div>
        </center>
      </div>
    </div>
  );
};

export default HousingList;

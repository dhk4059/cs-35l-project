import { useState, useEffect } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { auth, db } from "../../util/firebaseConfig";
import { onValue, ref, set } from "firebase/database";
import Loading from "../Loading";
import ListView from "./ListView";
import housingData from "../../util/housingData";

const PersonalListService = () => {
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
  const housingTitles = Object.keys(housingData);
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
      // if true, then we are adding stuff to our list and have to refresh housingKeys when done
      setHousingKeys(housingTitles);
      setMakePrefs([]);
      setDisableMakeListButton(false);
    }
    // console.log(housingTitles);
    set(ref(db, "userPrefs/" + user.uid + "/" + listNum), prefs[listNum]);
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
    onValue(ref(db, "userPrefs/" + user.uid), (snapshot) => {
      try {
        const data = snapshot.val();

        console.log(data);
        console.log("DB CALL");
        setPrefs(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    });
  }, [user.uid, setShowEditListButton]);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div style={{ height: "60vh" }}>
      <center>
        <div
          style={{
            marginBottom: "50px",
          }}
        >
          {prefs !== null ? (
            <div>
              <h2 className="text-center" style={{ fontWeight: "bold" }}>
                {isViewList
                  ? "Pick a List to View or Edit:"
                  : "Create a New List:"}
              </h2>
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
                      onClick={() => {
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
              disabled={disableMakeListButton}
            >
              <h2 className="text-center">Make List</h2>
            </Button>
          </center>
        </div>
        <center>
          <div
            className="d-flex justify-content-center"
            style={{
              width: "50vh",
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
      </div>
    </div>
  );
};

export default PersonalListService;

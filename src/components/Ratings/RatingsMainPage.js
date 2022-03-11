import { db } from "../../util/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UnknownPage from "../Misc/UnknownPage.js";
import Loading from "../Misc/Loading";
import Popup from "./RatingPopUp/PopUp.js";
import RatingPlacard from "./InfoPlacard/RatingPlacard";
import WrittenReviews from "./WrittenReview/WrittenReviews";

// Main page for each housing, displaying both the ratings placard
// along with a list of written text reviews if they are available.
// A Firebase Database call is made, and the resulting data is
// displayed using this page, as the status of the data also
// determines whether to show the page or a 404 error's unknown
// page due to the data being null.

const RatingsMainPage = () => {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [data, setData] = useState({});
  const [resetView, setResetView] = useState(0);

  useEffect(() => {
    const subscription = onValue(
      ref(db, "ratings/" + params.id),
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data === null) {
            throw TypeError;
          }
          setData(data);
          setHasData(true);
          setLoading(false);
        } catch (TypeError) {
          setHasData(false);
          setLoading(false);
        }
      }
    );
    return subscription;
  }, [params.id]);

  window.scrollTo(0, 0);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div
      className="d-flex justify-content-center"
      style={{
        minHeight: "100vh",
        paddingLeft: "50px",
        paddingRight: "50px",
      }}
    >
      {hasData ? (
        <div>
          <RatingPlacard housingData={data}></RatingPlacard>
          <br />
          <br />
          <center>
            <Popup
              setReset={() => {
                setResetView(resetView + 1);
              }}
            ></Popup>
          </center>
          <br />
          <br />
          <br />
          <WrittenReviews
            houseKey={params.id}
            resetList={resetView}
          ></WrittenReviews>
        </div>
      ) : (
        <UnknownPage></UnknownPage>
      )}
    </div>
  );
};

export default RatingsMainPage;

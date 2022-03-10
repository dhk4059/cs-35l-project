import { db } from "../../util/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UnknownPage from "../Misc/UnknownPage.js";
import Loading from "../Misc/Loading";
import Popup from "./DiningRatingPopUp/PopUp.js";
import DiningRatingPlacard from "./InfoPlacard/DiningRatingPlacard";
import WrittenDiningReviews from "./WrittenDiningReview/WrittenDiningReviews";

// Main page for each dining, displaying both the ratings placard
// along with a list of written text reviews if they are available.
// A Firebase Database call is made, and the resulting data is 
// displayed using this page, as the status of the data also
// determines whether to show the page or a 404 error's unknown
// page due to the data being null.

const DiningMainPage = () => {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [data, setData] = useState({});
  const [resetView, setResetView] = useState(0);

  useEffect(() => {
    const subscription = onValue(
      ref(db, "diningRatings/" + params.id),
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
          <DiningRatingPlacard diningData={data}></DiningRatingPlacard>
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
          <WrittenDiningReviews
            diningKey={params.id}
            resetList={resetView}
          ></WrittenDiningReviews>
        </div>
      ) : (
        <UnknownPage></UnknownPage>
      )}
    </div>
  );
};

export default DiningMainPage;

import { db } from "../../util/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UnknownPage from "../Misc/UnknownPage.js";
import Loading from "../Misc/Loading";
import Popup from "./popup";
import RatingPlacard from "./InfoPlacard/RatingPlacard";
import WrittenReviews from "./WrittenReview/WrittenReviews";

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

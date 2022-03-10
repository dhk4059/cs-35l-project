import { useState } from "react";
import StarRating from "./StarRating.js";
import { firestore, db } from "../../../util/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, onValue, update } from "firebase/database";
import { useParams } from "react-router-dom";

// The section of the popup that is responsible for letting
// users leave star ratings.

const Rating = ({ closePopUp, resetView }) => {
  const params = useParams();
  const [userReview, setReview] = useState("");
  const [overallRating, setOverallRating] = useState(null);
  const [busyness, setBusyness] = useState(null);
  const [cleanliness, setCleanliness] = useState(null);
  const [healthiness, setHealthiness] = useState(null);
  const [portionSize, setPortionSize] = useState(null);
  const [sittingSpace, setSittingSpace] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [hasStars, setHasStars] = useState(false);
  // let hasStars = false;
  const writeReview = async () => {
    if (userReview.length > 0) {
      try {
        await addDoc(collection(firestore, params.id), {
          overallRating: overallRating,
          busyness: busyness,
          cleanliness: cleanliness,
          healthiness: healthiness,
          sittingSpace: sittingSpace,
          portionSize: portionSize,
          review: userReview,
          timestamp: serverTimestamp(),
        });
        changeRatings();
        closePopUp();
        resetView();
      } catch (e) {
        console.log(e);
      }
    } else if (hasStars) {
      // console.log("wrote only to DB");
      changeRatings();
      closePopUp();
    } else {
      setShowWarning(true);
    }
  };

  const changeRatings = async () => {
    let data;
    onValue(ref(db, "diningRatings/" + params.id), (snapshot) => {
      data = snapshot.val();
      if (portionSize !== null) {
        data["portionSize"]["ratingSum"] += portionSize;
        data["portionSize"]["totalReviewers"] += 1;
      }
      if (cleanliness !== null) {
        data["cleanliness"]["ratingSum"] += cleanliness;
        data["cleanliness"]["totalReviewers"] += 1;
      }
      if (sittingSpace !== null) {
        data["sittingSpace"]["ratingSum"] += sittingSpace;
        data["sittingSpace"]["totalReviewers"] += 1;
      }
      if (overallRating !== null) {
        data["overallRating"]["ratingSum"] += overallRating;
        data["overallRating"]["totalReviewers"] += 1;
      }
      if (healthiness !== null) {
        data["healthiness"]["ratingSum"] += healthiness;
        data["healthiness"]["totalReviewers"] += 1;
      }
      if (busyness !== null) {
        data["busyness"]["ratingSum"] += busyness;
        data["busyness"]["totalReviewers"] += 1;
      }
    });
    update(ref(db, "diningRatings/" + params.id), data);
  };

  return (
    <div>
      <StarRating
        overall_rating={overallRating}
        busyness={busyness}
        cleanliness={cleanliness}
        healthiness={healthiness}
        portionSize={portionSize}
        sittingSpace={sittingSpace}
        saveOverallRating={(value) => setOverallRating(value)}
        saveBusyness={(value) => setBusyness(value)}
        saveCleanliness={(value) => setCleanliness(value)}
        saveHealthiness={(value) => setHealthiness(value)}
        savePortionSize={(value) => setPortionSize(value)}
        saveSittingSpace={(value) => setSittingSpace(value)}
        setFlag={() => setHasStars(true)}
      ></StarRating>

      <br></br>
      <br></br>

      <form>
        <label>Leave a Review:</label>
        <textarea
          className="form-control"
          id="comment"
          rows="3"
          max-rows="5"
          placeholder="Leave your review..."
          onChange={(event) => {
            event.preventDefault();
            setReview(event.target.value);
          }}
        ></textarea>
      </form>

      <br></br>
      <br></br>
      <div
        style={{
          height: "25px",
          color: "red",
          visibility: showWarning ? "visible" : "hidden",
        }}
      >
        Please Rate or Review.
      </div>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={(event) => {
          event.preventDefault();
          writeReview();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Rating;

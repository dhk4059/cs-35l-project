import { useState } from "react";
import StarRating from "./StarRating.js";
import { firestore, db } from "../../../util/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, onValue, update } from "firebase/database";
import { useParams } from "react-router-dom";

const Rating = ({ closePopUp, resetView }) => {
  const params = useParams();
  const [userReview, setReview] = useState("");
  const [overallRating, setOverallRating] = useState(null);
  const [proximityToCampus, setProximityToCampus] = useState(null);
  const [accessibilityToFood, setAccessibilityToFood] = useState(null);
  const [proximityToParking, setProximityToParking] = useState(null);
  const [accessToEssentials, setAccessToEssentials] = useState(null);
  const [noiseLevel, setNoiseLevel] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [hasStars, setHasStars] = useState(false);
  // let hasStars = false;
  // passes reviews for accessibility to food, proximity to UCLA, parking, access to essentials, noise level to the database
  const writeReview = async () => {
    if (userReview.length > 0) {
      try {
        const docRef = await addDoc(collection(firestore, params.id), {
          overallRating: overallRating,
          uclaProximity: proximityToCampus,
          foodAccess: accessibilityToFood,
          parkingProximity: proximityToParking,
          noiseLevel: noiseLevel,
          essentialsQuality: accessToEssentials,
          review: userReview,
          timestamp: serverTimestamp(),
        });
        console.log("document written with id: ", docRef.id);
        changeRatings();
        closePopUp();
        resetView();
      } catch (e) {
        console.log(e);
      }
    } else if (hasStars) {
      console.log("wrote only to DB");
      changeRatings();
      closePopUp();
    } else {
      setShowWarning(true);
    }
  };

  const changeRatings = async () => {
    let data;
    let filterDB = {};
    onValue(ref(db, "ratings/" + params.id), (snapshot) => {
      data = snapshot.val();
      if (accessToEssentials !== null) {
        data["essentialsQuality"]["ratingSum"] += accessToEssentials;
        data["essentialsQuality"]["totalReviewers"] += 1;
        filterDB["essentialsQuality"] = parseFloat(
          data["essentialsQuality"]["ratingSum"] /
            data["essentialsQuality"]["totalReviewers"]
        ).toFixed(2);
      }
      if (accessibilityToFood !== null) {
        data["foodAccess"]["ratingSum"] += accessibilityToFood;
        data["foodAccess"]["totalReviewers"] += 1;
        filterDB["foodAccess"] = parseFloat(
          data["foodAccess"]["ratingSum"] / data["foodAccess"]["totalReviewers"]
        ).toFixed(2);
      }
      if (noiseLevel !== null) {
        data["noiseLevel"]["ratingSum"] += noiseLevel;
        data["noiseLevel"]["totalReviewers"] += 1;
        filterDB["noiseLevel"] = parseFloat(
          data["noiseLevel"]["ratingSum"] / data["noiseLevel"]["totalReviewers"]
        ).toFixed(2);
      }
      if (overallRating !== null) {
        data["overallRating"]["ratingSum"] += overallRating;
        data["overallRating"]["totalReviewers"] += 1;
        filterDB["overallRating"] = parseFloat(
          data["overallRating"]["ratingSum"] /
            data["overallRating"]["totalReviewers"]
        ).toFixed(2);
      }
      if (proximityToParking !== null) {
        data["parkingProximity"]["ratingSum"] += proximityToParking;
        data["parkingProximity"]["totalReviewers"] += 1;
        filterDB["parkingProximity"] = parseFloat(
          data["parkingProximity"]["ratingSum"] /
            data["parkingProximity"]["totalReviewers"]
        ).toFixed(2);
      }
      if (proximityToCampus !== null) {
        data["uclaProximity"]["ratingSum"] += proximityToCampus;
        data["uclaProximity"]["totalReviewers"] += 1;
        filterDB["uclaProximity"] = parseFloat(
          data["uclaProximity"]["ratingSum"] /
            data["uclaProximity"]["totalReviewers"]
        ).toFixed(2);
      }
    });
    update(ref(db, "ratings/" + params.id), data);
    update(ref(db, "filterDB/" + params.id), filterDB);
  };

  return (
    <div>
      <StarRating
        overall_rating={overallRating}
        proximity_to_campus={proximityToCampus}
        accessibility_to_food={accessibilityToFood}
        parking={proximityToParking}
        access_to_essentials={accessToEssentials}
        noise_level={noiseLevel}
        saveOverallRating={(value) => setOverallRating(value)}
        saveProximityToCampus={(value) => setProximityToCampus(value)}
        saveAccessibilityToFood={(value) => setAccessibilityToFood(value)}
        saveParking={(value) => setProximityToParking(value)}
        saveAccessToEssentials={(value) => setAccessToEssentials(value)}
        saveNoiseLevel={(value) => setNoiseLevel(value)}
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
        onClick={writeReview}
      >
        Submit
      </button>
    </div>
  );
};

export default Rating;

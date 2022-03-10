import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

//use "rating" to show what is stored

const StarRating = ({
  overall_rating,
  proximity_to_campus,
  accessibility_to_food,
  parking,
  access_to_essentials,
  noise_level,
  saveOverallRating,
  saveProximityToCampus,
  saveAccessibilityToFood,
  saveParking,
  saveAccessToEssentials,
  saveNoiseLevel,
  setFlag,
}) => {
  const [hover0, setHover0] = useState(null);
  const [hover1, setHover1] = useState(null);
  const [hover2, setHover2] = useState(null);
  const [hover3, setHover3] = useState(null);
  const [hover4, setHover4] = useState(null);
  const [hover5, setHover5] = useState(null);

  return (
    <div>
      <center>
        <h5 id="star_description">Overall Quality</h5>
        {[...Array(5)].map((star, i) => {
          const ratingValue1 = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue1}
                onClick={(event) => {
                  event.preventDefault();
                  setFlag();
                  saveOverallRating(ratingValue1);
                }}
              />
              <FaStar
                className="star"
                color={
                  ratingValue1 <= (hover0 || overall_rating)
                    ? "#ffc107"
                    : "#e4e5e9"
                }
                size={25}
                onMouseEnter={() => setHover0(ratingValue1)}
                onMouseLeave={() => setHover0(null)}
              />
            </label>
          );
        })}
        <br></br>
        <br></br>
        <h6 id="star_description">Proximity to Campus</h6>
        {[...Array(5)].map((star, i) => {
          const ratingValue1 = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue1}
                onClick={(event) => {
                  event.preventDefault();
                  saveProximityToCampus(ratingValue1);
                  setFlag();
                }}
              />
              <FaStar
                className="star"
                color={
                  ratingValue1 <= (hover1 || proximity_to_campus)
                    ? "#ffc107"
                    : "#e4e5e9"
                }
                size={25}
                onMouseEnter={() => setHover1(ratingValue1)}
                onMouseLeave={() => setHover1(null)}
              />
            </label>
          );
        })}
        <br></br>
        <br></br>
        <h6 id="star_description">Accessibility to Food</h6>
        {[...Array(5)].map((star, i) => {
          const ratingValue2 = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue2}
                onClick={(event) => {
                  event.preventDefault();
                  saveAccessibilityToFood(ratingValue2);
                  setFlag();
                }}
              />
              <FaStar
                className="star"
                color={
                  ratingValue2 <= (hover2 || accessibility_to_food)
                    ? "#ffc107"
                    : "#e4e5e9"
                }
                size={25}
                onMouseEnter={() => setHover2(ratingValue2)}
                onMouseLeave={() => setHover2(null)}
              />
            </label>
          );
        })}
        <br></br>
        <br></br>
        <h6 id="star_description">Proximity to Parking</h6>
        {[...Array(5)].map((star, i) => {
          const ratingValue3 = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue3}
                onClick={(event) => {
                  event.preventDefault();
                  saveParking(ratingValue3);
                  setFlag();
                }}
              />
              <FaStar
                className="star"
                color={
                  ratingValue3 <= (hover3 || parking) ? "#ffc107" : "#e4e5e9"
                }
                size={25}
                onMouseEnter={() => setHover3(ratingValue3)}
                onMouseLeave={() => setHover3(null)}
              />
            </label>
          );
        })}
        <br></br>
        <br></br>
        <h6 id="star_description">Access to Essentials</h6>
        {[...Array(5)].map((star, i) => {
          const ratingValue4 = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue4}
                onClick={(event) => {
                  event.preventDefault();
                  saveAccessToEssentials(ratingValue4);
                  setFlag();
                }}
              />
              <FaStar
                className="star"
                color={
                  ratingValue4 <= (hover4 || access_to_essentials)
                    ? "#ffc107"
                    : "#e4e5e9"
                }
                size={25}
                onMouseEnter={() => setHover4(ratingValue4)}
                onMouseLeave={() => setHover4(null)}
              />
            </label>
          );
        })}
        <br></br>
        <br></br>
        <h6 id="star_description">Noise Level</h6>
        {[...Array(5)].map((star, i) => {
          const ratingValue5 = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue5}
                onClick={(event) => {
                  event.preventDefault();
                  saveNoiseLevel(ratingValue5);
                  setFlag();
                }}
              />
              <FaStar
                className="star"
                color={
                  ratingValue5 <= (hover5 || noise_level)
                    ? "#ffc107"
                    : "#e4e5e9"
                }
                size={25}
                onMouseEnter={() => setHover5(ratingValue5)}
                onMouseLeave={() => setHover5(null)}
              />
            </label>
          );
        })}
      </center>
    </div>
  );
};

export default StarRating;

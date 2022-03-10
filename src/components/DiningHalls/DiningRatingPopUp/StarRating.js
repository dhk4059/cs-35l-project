import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

// User sets a star rating in this component, which is sent back to
// Rating.js, the parent of StarRating.js

const StarRating = ({
  overall_rating,
  busyness,
  cleanliness,
  healthiness,
  portionSize,
  sittingSpace,
  saveOverallRating,
  saveBusyness,
  saveCleanliness,
  saveHealthiness,
  savePortionSize,
  saveSittingSpace,
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
        {[...Array(5)].map((_, i) => {
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
        <h6 id="star_description">Busyness</h6>
        {[...Array(5)].map((_, i) => {
          const ratingValue1 = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue1}
                onClick={(event) => {
                  event.preventDefault();
                  saveBusyness(ratingValue1);
                  setFlag();
                }}
              />
              <FaStar
                className="star"
                color={
                  ratingValue1 <= (hover1 || busyness) ? "#ffc107" : "#e4e5e9"
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
        <h6 id="star_description">Cleanliness</h6>
        {[...Array(5)].map((_, i) => {
          const ratingValue2 = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue2}
                onClick={(event) => {
                  event.preventDefault();
                  saveCleanliness(ratingValue2);
                  setFlag();
                }}
              />
              <FaStar
                className="star"
                color={
                  ratingValue2 <= (hover2 || cleanliness)
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
        <h6 id="star_description">Healthiness</h6>
        {[...Array(5)].map((_, i) => {
          const ratingValue3 = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue3}
                onClick={(event) => {
                  event.preventDefault();
                  saveHealthiness(ratingValue3);
                  setFlag();
                }}
              />
              <FaStar
                className="star"
                color={
                  ratingValue3 <= (hover3 || healthiness)
                    ? "#ffc107"
                    : "#e4e5e9"
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
        <h6 id="star_description">Portion Size</h6>
        {[...Array(5)].map((_, i) => {
          const ratingValue4 = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue4}
                onClick={(event) => {
                  event.preventDefault();
                  savePortionSize(ratingValue4);
                  setFlag();
                }}
              />
              <FaStar
                className="star"
                color={
                  ratingValue4 <= (hover4 || portionSize)
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
        <h6 id="star_description">Sitting Space</h6>
        {[...Array(5)].map((_, i) => {
          const ratingValue5 = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue5}
                onClick={(event) => {
                  event.preventDefault();
                  saveSittingSpace(ratingValue5);
                  setFlag();
                }}
              />
              <FaStar
                className="star"
                color={
                  ratingValue5 <= (hover5 || sittingSpace)
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

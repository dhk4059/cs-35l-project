import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

//use "rating" to show what is stored

const StarRating = () => {
    const [proximity_to_campus, setProximityToCampus] = useState(null);
    const [hover1, setHover1] = useState(null);
    const [accessibility_to_food, setAccessibilityToFood] = useState(null);
    const [hover2, setHover2] = useState(null);
    const [parking, setParking] = useState(null);
    const [hover3, setHover3] = useState(null);
    const [access_to_essentials, setAccessToEssentials] = useState(null);
    const [hover4, setHover4] = useState(null);
    const [noise_level, setNoiseLevel] = useState(null);
    const [hover5, setHover5] = useState(null);

    
    
    return (

        <div>
            
            
            <h1 id="star_description">Proximity to Campus: </h1>
            {[...Array(5)].map((star, i) => {
                const ratingValue1 = i + 1;

                return (
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue1}
                            onClick={() => setProximityToCampus(ratingValue1)} />
                        <FaStar
                            className="star"
                            color={ratingValue1 <= (hover1 || proximity_to_campus) ? "#ffc107" : "#e4e5e9"}
                            size={25}
                            onMouseEnter={() => setHover1(ratingValue1)}
                            onMouseLeave={() => setHover1(null)} />
                    </label>
                );
            })}
            <h1 id="star_description">Accessibility to Food: </h1>
            {[...Array(5)].map((star, i) => {
                const ratingValue2 = i + 1;

                return (
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue2}
                            onClick={() => setAccessibilityToFood(ratingValue2)} />
                        <FaStar
                            className="star"
                            color={ratingValue2 <= (hover2 || accessibility_to_food) ? "#ffc107" : "#e4e5e9"}
                            size={25}
                            onMouseEnter={() => setHover2(ratingValue2)}
                            onMouseLeave={() => setHover2(null)} />
                    </label>
                );
            })}
            <h1 id="star_description">Ease of Parking: </h1>
            {[...Array(5)].map((star, i) => {
                const ratingValue3 = i + 1;

                return (
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue3}
                            onClick={() => setParking(ratingValue3)} />
                        <FaStar
                            className="star"
                            color={ratingValue3 <= (hover3 || parking) ? "#ffc107" : "#e4e5e9"}
                            size={25}
                            onMouseEnter={() => setHover3(ratingValue3)}
                            onMouseLeave={() => setHover3(null)} />
                    </label>
                );
            })}
            <h1 id="star_description">Access to Essentials: </h1>
            {[...Array(5)].map((star, i) => {
                const ratingValue4 = i + 1;

                return (
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue4}
                            onClick={() => setAccessToEssentials(ratingValue4)} />
                        <FaStar
                            className="star"
                            color={ratingValue4 <= (hover4 || access_to_essentials) ? "#ffc107" : "#e4e5e9"}
                            size={25}
                            onMouseEnter={() => setHover4(ratingValue4)}
                            onMouseLeave={() => setHover4(null)} />
                    </label>
                );
            })}
            <h1 id="star_description">Noise Level: </h1>
            {[...Array(5)].map((star, i) => {
                const ratingValue5 = i + 1;

                return (
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue5}
                            onClick={() => setNoiseLevel(ratingValue5)} />
                        <FaStar
                            className="star"
                            color={ratingValue5 <= (hover5 || noise_level) ? "#ffc107" : "#e4e5e9"}
                            size={25}
                            onMouseEnter={() => setHover5(ratingValue5)}
                            onMouseLeave={() => setHover5(null)} />
                    </label>
                );
            })}
        </div>
    );
};


export default StarRating;
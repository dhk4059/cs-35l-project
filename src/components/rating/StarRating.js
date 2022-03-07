import React, { useState } from 'react';
import { FaStar } from "../react-icons/fa";
import { TextField } from '../@material-ui/core';

//use "rating" to show what is stored

const StarRating = () => {
    const [rating1, setRating1] = useState(null);
    const [hover1, setHover1] = useState(null);
    const [rating2, setRating2] = useState(null);
    const [hover2, setHover2] = useState(null);
    const [textbox, setText] = useState(null);
    
    return(
        <div>
            <h1>Star Rating Component Sample row 1: </h1>
            {[...Array(5)].map((star, i) => {
                const ratingValue1 = i + 1;

                return (
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue1}
                            onClick={() => setRating1(ratingValue1)} />
                        <FaStar
                            className="star"
                            color={ratingValue1 <= (hover1 || rating1) ? "#ffc107" : "#e4e5e9"}
                            size={100}
                            onMouseEnter={() => setHover1(ratingValue1)}
                            onMouseLeave={() => setHover1(null)} />
                    </label>
                );
            })}
            <h1>Star Rating Component Sample row 2: </h1>
            {[...Array(5)].map((star, i) => {
                const ratingValue2 = i + 1;

                return (
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue2}
                            onClick={() => setRating2(ratingValue2)} />
                        <FaStar
                            className="star"
                            color={ratingValue2 <= (hover2 || rating2) ? "#ffc107" : "#e4e5e9"}
                            size={100}
                            onMouseEnter={() => setHover2(ratingValue2)}
                            onMouseLeave={() => setHover2(null)} />
                    </label>
                );
            })}
            <TextField
                id="first-name"
                label="Name"
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
            />
        </div>
    );
};


export default StarRating;
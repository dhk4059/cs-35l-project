import React from 'react';
import logo from './logo.svg';
import './App.css';
import StarRating from './StarRating';
import 'bootstrap';

function App() {
  return (
    <div className="App">
      {/* Star ratings from star-rating-component */}
      <StarRating />
      <form>
        {/* text box input form from bootstrap*/}
        <div class="form-group">
          <label for="housingComments">Additional Comments:</label>
          <textarea class="form-control" id="housingComments" rows="3" max-rows="6" placeholder="Any additional comments about the housing?"></textarea>
        </div>
      </form>
      {/* button to submit review */}
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  );
}

// test comment

//export default App
export default App;

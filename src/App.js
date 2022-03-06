import React from 'react';
import logo from './logo.svg';
import './App.css';
import StarRating from './StarRating';
import 'bootstrap';

function App() {
  return (
    <div className="App">
      <StarRating />
      <form>
        <div class="form-group">
          <label for="housingComments">Additional Comments:</label>
          <textarea class="form-control" id="housingComments" rows="10" placeholder="Any additional comments about the housing?"></textarea>
        </div>
      </form>
    </div>
  );
}

// test comment

//export default App
export default App;

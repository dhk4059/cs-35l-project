import StarRating from './star-rating.js'
import { Form } from 'react-bootstrap'

const Rating = () => {
  return (
    <div>
      <StarRating></StarRating>
      
      <br></br>
      <br></br>

      <form>
        <label for="comment">Additional Comments:</label>
        <textarea
          class="form-control"
          id="comment"
          rows="3"
          max-rows="5"
          placeholder="Add any additional comments here"
        ></textarea>
      </form>

      <br></br>
      <br></br>

      <button type="button" class="btn btn-primary btn-lg">
        Submit
      </button>
    </div>
  )
}

export default Rating

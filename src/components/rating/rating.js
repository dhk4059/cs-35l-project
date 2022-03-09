import { useState, useEffect } from 'react'
import StarRating from './star-rating.js'
import { Form } from 'react-bootstrap'
import { firestore } from '../../util/firebaseConfig'
import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    orderBy,
    query,
  } from 'firebase/firestore'

const Rating = () => {
  const [userReview, setReview] = useState('')
    const ref = collection(firestore, 'reviews')
    const writeReview = async () => {
        if (userReview.length > 0) {
          try {
            const docRef = await addDoc(ref, {
              review: userReview,
              timestamp: serverTimestamp(),
            })
            console.log('document written with id: ', docRef.id)
          } catch (e) {
            console.log(e)
          }
        }
      }

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
          onChange={(event) => {
            setReview(event.target.value)}}
        ></textarea>
      </form>

      <br></br>
      <br></br>

      <button type="button" class="btn btn-primary btn-lg" onClick={writeReview}>
        Submit
      </button>
    </div>
  )
}

export default Rating

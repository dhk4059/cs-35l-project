import { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { firestore } from '../util/firebaseConfig'
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'

const FirestoreService = () => {
  const [userReview, setReview] = useState('')
  const [allReviews, setAllReviews] = useState([])
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

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(
        query(collection(firestore, 'reviews'), orderBy('timestamp', 'desc')),
      )
      setAllReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    getUsers()
  }, [])

  return (
    <Container className="justify-content-center" style={{ minHeight: '60vh' }}>
      <center>
        <h1>This review system uses Firebase Firestore</h1>
        <br />
        <br />
        <br />
        <h3>Write a Review:</h3>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows="5"
            onChange={(event) => {
              setReview(event.target.value)
            }}
          />
        </Form.Group>
        <br />
        <Button onClick={writeReview}>
          <h3>Submit Review</h3>
        </Button>
        <br />
        <br />
        <br />
        {allReviews.map((review) => {
          return (
            <div key={review.id}>
              <h6>Review: {review.review}</h6>
            </div>
          )
        })}
      </center>
    </Container>
  )
}

export default FirestoreService

import { useState, useEffect } from 'react'
// import { IoIosStar } from "react-icons/io"	
import { Container, Form, Button, Card } from 'react-bootstrap'
import { firestore } from '../util/firebaseConfig'
import Col from 'react-bootstrap/Col'	
import Row from 'react-bootstrap/Row'
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import Loading from './Loading'

const FirestoreService = () => {
  const [userReview, setReview] = useState('')
  const [allReviews, setAllReviews] = useState([])
  const ref = collection(firestore, 'reviews')
  const [isLoading, setLoading] = useState(true)

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
      setLoading(false)
    }

    getUsers()
  }, [])

  if (isLoading) {
    return <Loading></Loading>
  }
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
              <Card>	
              <Card.Img variant="top" src="holder.js/100px180" />	
              <Card.Body>	
                <Card.Text>	
                    
                  <Container>	
                  <Row>	
                  <Col sm={4}>	
                  <Row>accessibility to food</Row>	
                  {/* <IoIosStar/>	 */}
                  <Row>proximity to UCLA</Row>	
                  {/* <IoIosStar/>	 */}
                  <Row>parking</Row>	
                  {/* <IoIosStar/>	 */}
                  <Row>noise level</Row>	
                  {/* <IoIosStar/>	 */}
                  <Row>access to essentials</Row>	
                  {/* <IoIosStar/>	 */}
                
                  
                </Col>	
                <Col sm={8}>Review: {review.review}</Col>	
                </Row>	
                  </Container>	
                    
                  
                  </Card.Text>	
                </Card.Body>	
                </Card>	
  
            </div>
          )
        })}
      </center>
    </Container>
  )
}

export default FirestoreService

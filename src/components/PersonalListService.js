import { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { auth, db } from '../util/firebaseConfig'
import { onValue, ref } from 'firebase/database'
import Loading from './Loading'

const PersonalListService = () => {
  const user = auth.currentUser
  const [hasPref, setHasPref] = useState(false)
  const [prefs, setPrefs] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [hasData, setHasData] = useState(false)

  console.log(user.email)
  console.log(user.uid)

  // const changeRating = (num) => {
  //   console.log(num)
  //   update(ref(db, 'housing/' + params.id + '/' + filter), {
  //     ratingSum: ratingSum + num,
  //     totalReviewers: totalReviewers + 1,
  //   })

  //   set(
  //     ref(db, 'ratings/' + params.id + '/' + filter),
  //     parseFloat((ratingSum + num) / (totalReviewers + 1)).toFixed(2),
  //   )

  //   setYourRating('You rated ' + num + ' stars')
  //   setOtherRating(
  //     totalReviewers + 1 + ' have rated with a total rating of ' + ratingSum,
  //   )
  // }

  useEffect(() => {
    onValue(ref(db, 'userPrefs/' + user.uid), (snapshot) => {
      try {
        const data = snapshot.size

        console.log(data)
        setPrefs(data)
        setLoading(false)
        // setHasData(true)
      } catch (e) {
        console.log(e)
        setHasData(false)
        setLoading(false)
      }
    })
    return () => {}
  }, [user.uid])

  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <Container className="justify-content-center" style={{ minHeight: '75vh' }}>
      <Row>
        <Col md={5}>
          <h2 className="text-center">User Housing Preferences List:</h2>
        </Col>
        <Col md={{ offset: 4, span: 3 }}>
          {prefs.size !== 0 ? <h2>Dropdown</h2> : null}
        </Col>
      </Row>
      <br />
      <br />
      <br />{' '}
      <div className="d-flex align-items-center justify-content-center">
        {/* <Row>
            <Col> */}
        <center>
          <Button style={{ width: '35vh' }}>
            <h2 className="text-center">View List</h2>
          </Button>
        </center>
        {/* </Col>
            <Col> */}
        <center>
          <Button style={{ width: '35vh' }}>
            <h2 className="text-center">View List</h2>
          </Button>
        </center>
        {/* </Col>
          </Row> */}
      </div>
      <center>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width: '70vh',
            height: '70vh',
            backgroundColor: 'lightblue',
          }}
        >
          {hasData ? (
            prefs.map((idx) => <Container>{prefs[idx]}</Container>)
          ) : (
            <h1>Make a List!</h1>
          )}
        </div>
      </center>
    </Container>
  )
}

export default PersonalListService

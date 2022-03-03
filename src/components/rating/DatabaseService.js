import { useState } from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { db } from '../../util/firebaseConfig'
import { onValue, ref, update } from 'firebase/database'

const DatabaseService = () => {
  var [totalRating, setTotalRating] = useState(0)
  var [totalReviewers, setTotalReviewers] = useState(0)
  const [yourRating, setYourRating] = useState('')
  const [otherRating, setOtherRating] = useState('')

  const changeRating = (num) => {
    console.log(num)
    update(ref(db, 'housing'), {
      ratings: totalRating + num,
      total: totalReviewers + 1,
    })

    setYourRating('You rated ' + num + ' stars')
    setOtherRating(
      totalReviewers + ' have rated with a total rating of ' + totalRating,
    )
  }

  const resetRating = () => {
    update(ref(db, 'stars'), {
      ratings: 0,
      total: 0,
    })
    setTotalRating(0)
    setTotalReviewers(0)
    setYourRating('')
    setOtherRating('')
  }

  onValue(ref(db, 'stars'), (snapshot) => {
    const data = snapshot.val()
    totalRating = data['ratings']
    setTotalReviewers(data['total'])
    console.log('hello')
  })

  return (
    <Container className="justify-content-center" style={{ minHeight: '50vh' }}>
      <center>
        <h1>This star rating uses Firebase Database</h1>
        <br />
        <br />
        <br />
        <h1>Choose a Number Rating</h1>
        <Row className="w-50">
          <Col>
            <Button onClick={() => changeRating(1)} className="ps-3 pe-3">
              <h1>1</h1>
            </Button>
          </Col>
          <Col>
            <Button onClick={() => changeRating(2)} className="ps-3 pe-3">
              <h1>2</h1>
            </Button>
          </Col>
          <Col>
            <Button onClick={() => changeRating(3)} className="ps-3 pe-3">
              <h1>3</h1>
            </Button>
          </Col>
          <Col>
            <Button onClick={() => changeRating(4)} className="ps-3 pe-3">
              <h1>4</h1>
            </Button>
          </Col>
          <Col>
            <Button onClick={() => changeRating(5)} className="ps-3 pe-3">
              <h1>5</h1>
            </Button>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <h1>Current Rating:</h1>
        <h2>
          {totalReviewers > 0
            ? parseFloat(totalRating / totalReviewers).toFixed(2)
            : 0}
        </h2>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>{yourRating}</h3>
        <h3>{otherRating}</h3>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Button onClick={resetRating}>
          <h2>Reset Rating</h2>
        </Button>
      </center>
    </Container>
  )
}

export default DatabaseService

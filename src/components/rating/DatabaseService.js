import { useEffect, useState } from 'react'
import {
  Container,
  Button,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap'
import { db } from '../../util/firebaseConfig'
import { onValue, ref, set, update } from 'firebase/database'
import { useParams } from 'react-router-dom'
import UnknownPage from '../UnknownPage'
import Loading from '../Loading'

const DatabaseService = () => {
  var [ratingSum, setRatingSum] = useState(0)
  var [totalReviewers, setTotalReviewers] = useState(0)
  const [yourRating, setYourRating] = useState('')
  const [otherRating, setOtherRating] = useState('')
  const [filter, setFilter] = useState('overallRating')
  const [hasData, setHasData] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const params = useParams()

  const changeRating = (num) => {
    console.log(num)
    update(ref(db, 'housing/' + params.id + '/' + filter), {
      ratingSum: ratingSum + num,
      totalReviewers: totalReviewers + 1,
    })

    set(
      ref(db, 'ratings/' + params.id + '/' + filter),
      parseFloat((ratingSum + num) / (totalReviewers + 1)).toFixed(2),
    )

    setYourRating('You rated ' + num + ' stars')
    setOtherRating(
      totalReviewers + 1 + ' have rated with a total rating of ' + ratingSum,
    )
  }

  useEffect(() => {
    onValue(ref(db, 'housing/' + params.id), (snapshot) => {
      try {
        const data = snapshot.val()
        setRatingSum(data[filter]['ratingSum'])
        setTotalReviewers(data[filter]['totalReviewers'])
        setTitle(data['title'])
        setLoading(false)
        console.log(data)
      } catch (TypeError) {
        setHasData(false)
        setLoading(false)
        console.log()
      }
    })
    return () => {}
  }, [params.id, filter])

  if (isLoading) {
    return <Loading></Loading>
  }
  return hasData ? (
    <Container className="justify-content-center" style={{ minHeight: '75vh' }}>
      <center>
        <h1>Residential Building: {title}</h1>
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
        <DropdownButton
          id="dropdown-basic-button"
          title="Filter"
          menuVariant="dark"
        >
          <Dropdown.Item onClick={() => setFilter('overallRating')}>
            <h3>Overall Rating</h3>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('essentialsQuality')}>
            <h3>Quality of Essentials</h3>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('foodAccess')}>
            <h3>Access to Food</h3>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('noiseLevel')}>
            <h3>Noise Level</h3>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('parkingProximity')}>
            <h3>Proximity to Parking</h3>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('uclaProximity')}>
            <h3>Proximity to Campus</h3>
          </Dropdown.Item>
        </DropdownButton>
        <br />
        <br />
        <br />
        <h1>Current Rating:</h1>
        <h2>
          {totalReviewers > 0
            ? parseFloat(ratingSum / totalReviewers).toFixed(2)
            : null}
        </h2>
        <br />
        <br />
        <h1>Current Filter:</h1>
        <h2>{filter}</h2>
        <br />
        <br />
        <br />
        <h3>{yourRating}</h3>
        <h3>{otherRating}</h3>
      </center>
    </Container>
  ) : (
    <UnknownPage></UnknownPage>
  )
}

export default DatabaseService

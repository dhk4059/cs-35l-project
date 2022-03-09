import { useEffect, useState } from 'react'
import {
  Container,
  Button,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Card,
} from 'react-bootstrap'
import { db } from '../../util/firebaseConfig'
import { onValue, ref, set, update } from 'firebase/database'
import { useParams } from 'react-router-dom'
import UnknownPage from '../UnknownPage'
import Loading from '../Loading'
import Popup from './popup.js'

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
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: '75vh' }}
    >
      <center>
        <Card
          style={{
            // width: '25rem',
            // height: '25rem',
            border: '3px solid',
          }}
        >
          <Card.Body>
            <Card.Title>
              <h1>Residential Building: {title}</h1>
            </Card.Title>
          </Card.Body>
        </Card>
        <br />
        <br />
        <h2>Choose which rating to show</h2>
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
        <Popup></Popup>

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

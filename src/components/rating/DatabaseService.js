import { useEffect, useState } from 'react'
import {
  Container,
  Card,
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
  const [data, setData] = useState([])
  const [hasData, setHasData] = useState(true)
  const [isLoading, setLoading] = useState(true)
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
    onValue(ref(db, 'housing/' + params.id + '/' + filter), (snapshot) => {
      try {
        const data = snapshot.val()
        setRatingSum(data['ratingSum'])
        setTotalReviewers(data['totalReviewers'])
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
        <h1>This star rating uses Firebase Database</h1>
        <br />
        <br />
        <br />
        <img src="https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png"
        alt="Building image" width = "240" height = "240">
        </img>
        <br />
        <br />
        <br />
        <Container
        className="d-flex justify-content-center"
        style={{ minHeight: '75vh' }}
        >
          <div style={{ border: '3px solid', width: '300px' }}>
            {hasData
              ? data.map((attr, idx) => (
                  <Card
                    className="text-left mt-3"
                    key={idx}
                    style={{
                      width: '25rem',
                      height: '22rem',
                      border: '3px solid',
                    }}
                  >
                    <Card.Body>
                      <Card.Title>
                        <h1>{attr['title']}</h1>
                      </Card.Title>
                      <Card.Text>
                        {'Overall Rating: ' + attr['overallRating']}
                      </Card.Text>
                      <br />
                      <Card.Text>
                        {'Quality of Essentials: ' + attr['essentialsQuality']}
                      </Card.Text>
                      <Card.Text>
                        {'Access to Food: ' + attr['foodAccess']}
                      </Card.Text>
                      <Card.Text>{'Noise Level: ' + attr['noiseLevel']}</Card.Text>
                      <Card.Text>
                        {'Proximity to Parking: ' + attr['parkingProximity']}
                      </Card.Text>
                      <Card.Text>
                        {'Proximity to Campus: ' + attr['uclaProximity']}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))
              : null}
          </div>
        </Container>      
      </center>
    </Container>
  ) : (
    <UnknownPage></UnknownPage>
  )
}

export default DatabaseService

import { db } from '../../util/firebaseConfig'
import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loading from '../Loading'

const HousingPage = () => {
  const [hasData, setHasData] = useState(0)
  const [data, setData] = useState([])
  const [keys, setKeys] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    onValue(ref(db, 'ratings'), (snapshot) => {
      var housing = []
      var housingKeys = []
      snapshot.forEach((child) => {
        housing.push(child.val())
        housingKeys.push(child.key)
      })
      setData(housing)
      setHasData(1)
      setKeys(housingKeys)
      console.log(housing)
      console.log(housingKeys)
      setLoading(false)
    })
    return () => {}
  }, [])

  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <Container
      className="d-flex justify-content-center"
      // style={{ minHeight: '75vh' }}
    >
      <div>
        {hasData
          ? data.map((attr, idx) => (
              <Card
                className="text-left mt-3"
                key={idx}
                style={{
                  width: '25rem',
                  height: '25rem',
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
                  <div style={{ border: '3px solid', width: '300px' }}>
                    <center>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={'/' + keys[idx]}
                        // This opens links in a new tab
                        // target="_blank"
                      >
                        <h4>{attr['title'] + ' Page'}</h4>
                      </Link>
                    </center>
                  </div>
                </Card.Body>
              </Card>
            ))
          : null}
      </div>
    </Container>
  )
}

export default HousingPage

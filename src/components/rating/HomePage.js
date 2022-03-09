import { db } from '../../util/firebaseConfig'
import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { Card, Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loading from '../Loading'

const HomePage = () => {
  
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
   
   
   <center>
      <img src="https://external-preview.redd.it/ZvJ-OZpSX3XQ1DsVzTyJ8qMl0fl95JxOrzma5dvcyJM.jpg?width=640&crop=smart&auto=webp&s=3f1f667ecc3c818a1cbe86897178f8b4c31b0794"
      alt="Hill map" width = "960" height = "650">
      </img>

      <Container
      className="d-flex justify-content-center"
      style={{ minHeight: '75vh' }}
      >
        <div style={{marginTop: "50px"}}>
        {hasData ? data.map((attr, idx) => (
                                      
          <div style={{ backgroundColor: 'white', border: '1px solid', width: '300px' }}>
            <center>
              <Link
                style={{ textDecoration: 'none' }}
                to={'/' + keys[idx]}
              >
                <h4>{attr['title'] + ' Page'}</h4>
              </Link>
            </center>
          </div>

        )) : null}
        </div>
      </Container>
    </center>
  )
}

export default HomePage

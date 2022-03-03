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

  useEffect(() => {
    onValue(ref(db, 'userPrefs/' + user.uid), (snapshot) => {
      try {
        const data = snapshot.val()

        console.log(data)
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
        <Col md={{ offset: 5, span: 2 }}>
          <h2>Hello</h2>
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <div>
        {hasData ? (
          prefs.map((idx) => <Container>{prefs[idx]}</Container>)
        ) : (
          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <center>
        <Button>
          <h2>Create List</h2>
        </Button>
      </center>
    </Container>
  )
}

export default PersonalListService

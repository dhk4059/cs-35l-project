import { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap'
import { auth, db } from '../util/firebaseConfig'
import { onValue, ref } from 'firebase/database'
import Loading from './Loading'

const PersonalListService = () => {
  const user = auth.currentUser
  const [hasPref, setHasPref] = useState(false)
  const [prefs, setPrefs] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isViewList, setIsViewList] = useState(true)
  const [listNum, setListNum] = useState(0)

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
    onValue(ref(db, 'userPrefs/' + user.uid + ''), (snapshot) => {
      try {
        const data = snapshot.val()

        console.log(data)
        console.log('DB CALL')
        setPrefs(data)
        setLoading(false)
        setHasPref(true)
        // data.map((index, keys) => {
        //   console.log(index)
        //   console.log(keys)
        // })
      } catch (e) {
        console.log(e)
        setHasPref(false)
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
          {prefs !== null ? (
            <DropdownButton
              align="end"
              id="dropdown-basic-button"
              title="List Number"
              menuVariant="dark"
            >
              {prefs.map((_, index) => {
                return (
                  <Dropdown.Item
                    key={index + 1}
                    onClick={() => setListNum(index)}
                  >
                    <h5>{index + 1}</h5>
                  </Dropdown.Item>
                )
              })}
            </DropdownButton>
          ) : null}
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <div className="d-flex align-items-center justify-content-center">
        <center>
          {/* TODO: BUTTONS NEED TO FLEX */}
          <Button
            onClick={() => setIsViewList(true)}
            variant={isViewList ? 'primary' : 'outline-primary'}
            style={{ width: '35vh' }}
          >
            <h2 className="text-center">View List</h2>
          </Button>
        </center>
        <center>
          <Button
            onClick={() => setIsViewList(false)}
            variant={!isViewList ? 'primary' : 'outline-primary'}
            style={{ width: '35vh' }}
          >
            <h2 className="text-center">Make List</h2>
          </Button>
        </center>
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
          {hasPref && prefs !== null ? (
            prefs[listNum].map((keys) => {
              console.log(keys)
              return (
                <Container key={keys}>
                  <h6>{keys}</h6>
                </Container>
              )
            })
          ) : (
            <h1>Make a List!</h1>
          )}
        </div>
      </center>
    </Container>
  )
}

export default PersonalListService

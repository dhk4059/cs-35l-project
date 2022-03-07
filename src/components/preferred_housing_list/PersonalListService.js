import { useState, useEffect } from 'react'
import { Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { auth, db } from '../../util/firebaseConfig'
import { onValue, ref } from 'firebase/database'
import Loading from '../Loading'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

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
    <div className="justify-content-center" style={{ minHeight: '75vh' }}>
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
          <Button
            onClick={() => setIsViewList(true)}
            variant={isViewList ? 'primary' : 'outline-primary'}
            style={{ width: '25vh' }}
          >
            <h2 className="text-center">View List</h2>
          </Button>
        </center>
        <center>
          <Button
            onClick={() => setIsViewList(false)}
            variant={!isViewList ? 'success' : 'outline-success'}
            style={{ width: '25vh' }}
          >
            <h2 className="text-center">Make List</h2>
          </Button>
        </center>
      </div>
      <center>
        {/* ALL DRAG STUFF IS DONE UNDER HERE */}
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width: '70vh',
            // height: '70vh',
            backgroundColor: 'lightblue',
          }}
        >
          <Test num={hasPref && prefs !== null ? listNum : 0}></Test>

          {/* {hasPref && prefs !== null ? (
            prefs[listNum].map((key) => {
              console.log(key)
              return (
                <div key={key}>
                  <h6>{key}</h6>
                </div>
              )
            })
          ) : (
            <h1>Make a List!</h1>
          )} */}
        </div>
      </center>
    </div>
  )
}

// EXAMPLE OF REACT BEAUTIFUL DND

const Test = (props) => {
  const [keyData, setData] = useState({
    columns: {
      column1: ['centennial', 'holly-terrace', 'sproul-hall', 'rieber-hall'],
      column2: ['rieber-vista', 'rieber-terrace', 'hedrick'],
    },
    columnOrder: ['column1'],
  })

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // user drops item back into starting position,
    // so we don't do anything
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // reorder array
    console.log(result)
    let column = keyData.columns[source.droppableId]
    column.splice(source.index, 1)
    column.splice(destination.index, 0, draggableId)
    const newColumn = {
      ...column,
    }

    const newData = {
      ...this.keyData,
      columns: {
        ...keyData.columns,
        ['column1']: newColumn,
      },
    }

    setData(newData)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {keyData.columnOrder.map((columnNum) => {
        const column = keyData.columns['column1']

        return <Column key={'column1'} column={column}></Column>
      })}
    </DragDropContext>
  )
}

const DNDArea = styled.div`
  margin: 8px;
  border: 3px solid black;
  padding: 8px;
`

const TaskList = styled.div`
  padding: 8px;
`

const Column = (props) => {
  return (
    <DNDArea>
      <Droppable droppableId={'column1'}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {props.column.map((house, index) => {
              return <Task key={house} index={index} houseKey={house}></Task>
            })}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </DNDArea>
  )
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid black;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: lightblue;
`

const Task = (props) => {
  return (
    <Draggable draggableId={props.houseKey} index={props.index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.houseKey}
          {/* {provided.placeholder} */}
        </Container>
      )}
    </Draggable>
  )
}
export default PersonalListService

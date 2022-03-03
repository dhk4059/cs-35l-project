import { Container, Row, Col } from 'react-bootstrap'

const PersonalListService = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '75vh' }}
    >
      <Row>
        <Col>
          <h1>Personal User List</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default PersonalListService

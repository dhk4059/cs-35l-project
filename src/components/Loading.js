import { Container } from 'react-bootstrap'

const Loading = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '75vh' }}
    >
      <center>
        <h1 style={{ color: 'blue' }}>LOADING...</h1>
      </center>
    </Container>
  )
}

export default Loading

import { Container } from 'react-bootstrap'

const Loading = () => {
  return (
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: '75vh' }}
    >
      <h1 style={{ color: 'blue' }}>LOADING...</h1>
    </Container>
  )
}

export default Loading

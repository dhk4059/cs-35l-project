import { Container } from 'react-bootstrap'

const UnknownPage = () => {
  return (
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: '75vh' }}
    >
      <h1 style={{ color: 'red', fontSize: 70 }}>Page Not Found</h1>
    </Container>
  )
}

export default UnknownPage

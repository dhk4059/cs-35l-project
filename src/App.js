import AuthService from './components/AuthService'
import Home from './components/Home'

function App({ user }) {
  return user != null ? <Home></Home> : <AuthService></AuthService>
}

// test comment

export default App

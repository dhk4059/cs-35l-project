import AuthService from './components/AuthService'
import Home from './components/Home'

function App({ user }) {
  return user != null ? <Home></Home> : <AuthService></AuthService>
}

export default App

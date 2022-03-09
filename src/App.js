import AuthService from './components/Auth/AuthService'
import Home from './components/Home/Home'

function App({ user }) {
  return user != null ? <Home></Home> : <AuthService></AuthService>
}

export default App

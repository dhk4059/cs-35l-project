import { useState, useEffect } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../util/firebaseConfig";
import { useNavigate } from "react-router-dom";

// Login Page
// Runs authentication via email/password authentication.
// If an account exists, users can sign in with that account.
// Otherwise, users can register an account.
// Basic error checking for emails already existing or wrong
// passwords being given for an email.

const AuthService = () => {
  const [isLogin, setChoice] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  // try to register user
  const register = async () => {
    var user;
    try {
      user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
    return user;
  };

  // try to login user
  const login = async () => {
    var user;
    try {
      user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
    return user;
  };

  // try to authenticate user using the result of either
  // login() or register()
  const authenticate = async () => {
    if (isLogin) {
      login().then((value) => {
        console.log(value);
        if (value !== undefined) {
          navigate("/", { replace: true });
        }
      });
    } else {
      register().then((value) => {
        console.log(value);
        if (value !== undefined) {
          navigate("/", { replace: true });
        }
      });
    }
  };

  // Listen for change in user's login status to see whether
  // to display the login page or not for the user.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        setAlreadyLoggedIn(true);
      }
      setCheckingAuth(false);
    });

    return unsubscribe;
  }, []);

  // Loading page while waiting for async authentication
  if (checkingAuth) {
    return (
      <div
        className="d-flex justify-content-center"
        style={{
          minHeight: "100vh",
          width: "100vw",
          paddingTop: "100px",
        }}
      >
        <h1>Checking authentication...</h1>
      </div>
    );
  }
  // Element to render if user is already logged in
  if (alreadyLoggedIn) {
    return (
      <center>
        <div
          // className="d-flex justify-content-center"
          style={{
            minHeight: "100vh",
            width: "100vw",
            paddingTop: "100px",
          }}
        >
          <h1>
            {"User at " +
              auth.currentUser.email +
              ", you are already logged in."}
          </h1>
          <Button
            onClick={(event) => {
              event.preventDefault();
              navigate("/", { replace: true });
            }}
          >
            <h3>Go to Home</h3>
          </Button>
        </div>
      </center>
    );
  }
  // Login Page displayed when user is not signed in
  return (
    <div
      className="d-flex justify-content-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        paddingTop: "100px",
      }}
    >
      <div>
        <h1 className="text-center">Login</h1>
        <br />
        <Row xs="auto" className="justify-content-md-center">
          <Col>
            <Button
              onClick={(event) => {
                event.preventDefault();
                setChoice(true);
              }}
              variant={isLogin ? "primary" : "outline-primary"}
            >
              <h3>Login</h3>
            </Button>
          </Col>
          <Col>
            <Button
              onClick={(event) => {
                event.preventDefault();
                setChoice(false);
              }}
              variant={!isLogin ? "primary" : "outline-primary"}
            >
              <h3>Register</h3>
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <div>
            <h6 className="text-center">
              {"Enter email/password to " + (isLogin ? "login:" : "register:")}
            </h6>
          </div>
        </Row>
        <br />
        <center>
          <Form>
            <Form.Group className="mb-4">
              <Form.Control
                placeholder="Enter email"
                onChange={(event) => {
                  event.preventDefault();
                  setEmail(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  event.preventDefault();
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>
            <Button onClick={authenticate}>
              <h5>{isLogin ? "Login" : "Register"}</h5>
            </Button>
          </Form>
        </center>
      </div>
    </div>
  );
};

export default AuthService;

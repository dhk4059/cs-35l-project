import { useState, useEffect } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../util/firebaseConfig";
import { useNavigate } from "react-router-dom";

const AuthService = () => {
  const [isLogin, setChoice] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  const register = async () => {
    var user;
    try {
      user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
    return user;
  };

  const login = async () => {
    var user;
    try {
      user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
    return user;
  };

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        setAlreadyLoggedIn(true);
      }
      setCheckingAuth(false);
    });

    return unsubscribe;
  }, []);

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

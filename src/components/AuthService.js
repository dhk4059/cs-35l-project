import { useEffect, useState } from "react";
import { Col, Row, Button, Form, Container } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../util/firebaseConfig";

const AuthService = () => {
  const [isLogin, setChoice] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState({});

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

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <h1 className="text-center">Login Demo </h1>
        <br />
        <br />
        <Row xs="auto" className="justify-content-md-center">
          <Col>
            <Button
              onClick={() => setChoice(true)}
              variant={isLogin ? "primary" : "outline-primary"}
              disabled={isLogin}
            >
              <h3>Login</h3>
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => setChoice(false)}
              variant={!isLogin ? "primary" : "outline-primary"}
              disabled={!isLogin}
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
              <Form.Label>Email address</Form.Label>
              <Form.Control
                //   type="email"
                placeholder="Enter email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>
            <Button
              onClick={async () => {
                if (isLogin) {
                  login().then((value) => {
                    console.log(value);
                  });
                } else {
                  register().then((value) => {
                    console.log(value);
                  });
                }
              }}
            >
              <h5>{isLogin ? "Login" : "Register"}</h5>
            </Button>
          </Form>
        </center>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="text-center">
          <Button variant="secondary" onClick={logout}>
            <h5>Log Out</h5>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default AuthService;

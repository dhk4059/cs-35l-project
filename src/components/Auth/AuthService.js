import { useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../util/firebaseConfig";

const AuthService = () => {
  const [isLogin, setChoice] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      });
    } else {
      register().then((value) => {
        console.log(value);
      });
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url("https://admission.ucla.edu/sites/default/files/hero-landing-images/campus-downtown-2x.jpg")`,
      }}
    >
      <div>
        <h1 className="text-center">Login</h1>
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

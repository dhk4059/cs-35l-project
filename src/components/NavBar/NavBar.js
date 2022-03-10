import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../util/firebaseConfig";
import { Row, Col, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };

  const login = () => {
    navigate("/login");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        setUser(currentUser);
      }
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <div>
        <center>
          <nav
            style={{
              paddingBottom: "10px",
              paddingTop: "1rem",
              maxWidth: "90vw",
            }}
          >
            <SearchBar></SearchBar>
            <div style={{ marginTop: "15px" }}>
              <Row>
                <Col>
                  <div style={{ paddingTop: "10px" }}>
                    <h4>
                      <Link to="/" style={{ textDecoration: "none" }}>
                        Home
                      </Link>
                    </h4>
                  </div>
                </Col>
                <Col>
                  <div style={{ paddingTop: "10px" }}>
                    <h4>
                      <Link
                        to="/preferred-housing"
                        style={{ textDecoration: "none" }}
                      >
                        Preferred Housing
                      </Link>
                    </h4>
                  </div>
                </Col>
                <Col>
                  <div style={{ paddingTop: "10px" }}>
                    <h4>
                      <Link
                        to="/filtered-search"
                        style={{ textDecoration: "none" }}
                      >
                        Filtered Search
                      </Link>
                    </h4>
                  </div>
                </Col>
                <Col>
                  {checkingAuth ? (
                    <Button size="sm" variant="primary">
                      <h4>Log Out</h4>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={user !== null ? logout : login}
                    >
                      <h4>{user !== null ? "Log Out" : "Log in"}</h4>
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
          </nav>
        </center>
      </div>
    </div>
  );
};

export default NavBar;

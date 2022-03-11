import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../util/firebaseConfig";
import { Row, Col, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Navigation Bar
// This navbar stays at the top of the page, with re-rendering
// mostly happening below the page.

const NavBar = ({ housingTitles }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // If logout, then sign user out and navigate to login page
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };

  // Navigate to login page.
  const login = () => {
    navigate("/login");
  };

  useEffect(() => {
    // check if auth is already signed in or not to determine
    // what the Login/LogOut button does
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
            <SearchBar titles={housingTitles}></SearchBar>
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
                      onClick={(event) => {
                        event.preventDefault();
                        user !== null ? logout() : login();
                      }}
                      style={{
                        paddingLeft: "13px",
                        paddingRight: "13px",
                        paddingTop: "7px",
                        paddingBottom: "0px",
                      }}
                    >
                      <h4>{user !== null ? "Log Out" : "Login"}</h4>
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

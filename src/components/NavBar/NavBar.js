import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../util/firebaseConfig";
import { Row, Col, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const logout = async () => {
    await signOut(auth);
  };

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
                        to="/housinglist"
                        style={{ textDecoration: "none" }}
                      >
                        Housing List
                      </Link>
                    </h4>
                  </div>
                </Col>
                <Col>
                  <div style={{ paddingTop: "10px" }}>
                    <h4>
                      <Link
                        to="/filteredsearch"
                        style={{ textDecoration: "none" }}
                      >
                        Filtered Search
                      </Link>
                    </h4>
                  </div>
                </Col>
                <Col>
                  <Button size="sm" variant="primary" onClick={logout}>
                    <h4>Log Out</h4>
                  </Button>
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

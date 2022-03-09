import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../util/firebaseConfig";
import { Row, Col, Button } from "react-bootstrap";

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
              borderBottom: "solid 3px",
              paddingBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <Row>
              <Col>
                <div style={{ paddingTop: "10px" }}>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <h4 className="text-center">Home</h4>
                  </Link>
                </div>
              </Col>
              <Col>
                <div style={{ paddingTop: "10px" }}>
                  <Link
                    to="/firestore-test"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <h4 className="text-center">Ratings</h4>
                  </Link>
                </div>
              </Col>
              <Col>
                <div style={{ paddingTop: "10px" }}>
                  <Link
                    to="/filtersearch-test"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <h4 className="text-center">Filter Search</h4>
                  </Link>
                </div>
              </Col>
              <Col>
                <div style={{ paddingTop: "10px" }}>
                  <Link
                    to="/personallist-test"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <h4 className="text-center">Housing List</h4>
                  </Link>
                </div>
              </Col>
              <Col>
                <Button size="sm" variant="primary" onClick={logout}>
                  <h4>Log Out</h4>
                </Button>
              </Col>
            </Row>
          </nav>
        </center>
      </div>
    </div>
  );
};

export default NavBar;

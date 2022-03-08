import { Link, Outlet } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../util/firebaseConfig";
import { GiBirdHouse } from "react-icons/gi";

const Home = () => {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div id="navbar">
      <div
        style={{
          paddingInline: "100px",
          borderBottom: "solid 3px black",
          backgroundColor: "skyblue",
        }}
      >
        <div style={{ padding: "20px" }}>
          <h2 className="text-center">Navigation Bar</h2>
        </div>
        <div
          style={{
            flexGrow: 1,
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <nav
            style={{
              flexGrow: 1,
              justifyContent: "space-between",
              paddingInline: "100px",
            }}
          >
            <Row>
              <Col>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <h4 className="text-center">Star Ratings</h4>
                </Link>
              </Col>
              <Col>
                <Link
                  to="/firestore-test"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <h4 className="text-center">Written Reviews</h4>
                </Link>
              </Col>
              <Col>
                <Link
                  to="/filtersearch-test"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <h4 className="text-center">Filter Search</h4>
                </Link>
              </Col>
              <Col>
                <Link
                  to="/personallist-test"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <h4 className="text-center">Preferred Housing</h4>
                </Link>
              </Col>
              <Col>
                <div className="text-center">
                  <Button variant="primary" onClick={logout}>
                    <h5>Log Out</h5>
                  </Button>
                </div>
              </Col>
            </Row>
          </nav>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;

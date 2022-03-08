import { Link, Outlet } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../util/firebaseConfig";
import { GiBirdHouse } from "react-icons/gi";
import { FilterSearchService } from "./FilterSearchService.js"

const Home = () => {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <div>
        <GiBirdHouse />
        <Row className="mt-3">
          
          <Col md={{ span: 6, offset: 6 }}>
            <div className="text-center">
              <Button type="button" className="btn btn-primary" onClick={logout}>
                <h5>Log Out</h5>
              </Button>
              &nbsp;&nbsp;&nbsp;
              {/* link to filter search page */}
              <Link
                  to="/filtersearch-test"
                  type="button"
                  className="btn btn-primary"
                >
                  <h5>Filter Search</h5>
                </Link>
                &nbsp;&nbsp;&nbsp;
                {/* link to personal list */}
                <Link
                  to="/personallist-test"
                  type="button"
                  className="btn btn-primary"
                >
                  <h5>Housing List</h5>
                </Link>
            </div>
          </Col>
        </Row>
        <div>
          <nav style={{ borderBottom: "solid 3px", paddingBottom: "1rem" }}>
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
              </Col>
              <Col>
                
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

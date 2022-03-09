import { Link, Outlet } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../util/firebaseConfig";
import { GiBirdHouse } from "react-icons/gi";
import { FilterSearchService } from "./FilterSearchService.js";

const Home = () => {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <div style={{ backgroundColor: "paleturquoise", paddingTop: "20px" }}>
        
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
                  <h4 className="text-center">Home</h4>
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
                  to="/firestore-test"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <h4 className="text-center">Housing List</h4>
                </Link>
              </Col>
              <Col>
                {/* <div className="text-center"> */}
                  <Button variant="primary" onClick={logout}>
                    <h5>Log Out</h5>
                  </Button>
                {/* </div> */}
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

import { Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Displays Home (Home on the navbar or '/' as the path route)
// A list of dorm names is retrieved from index.js' initial DB call.

const HomePage = ({ housingTitles, housingKeys, diningTitles, diningKeys }) => {
  const housingTitlesA = housingTitles.slice(0, 8);
  const housingTitlesB = housingTitles.slice(8, 16);
  const housingTitlesC = housingTitles.slice(16, 24);
  const housingKeysA = housingKeys.slice(0, 8);
  const housingKeysB = housingKeys.slice(8, 16);
  const housingKeysC = housingKeys.slice(16, 24);
  const diningTitlesA = diningTitles.slice(0, 3);
  const diningTitlesB = diningTitles.slice(3, 6);
  const diningTitlesC = diningTitles.slice(6, 9);
  const diningKeysA = diningKeys.slice(0, 3);
  const diningKeysB = diningKeys.slice(3, 6);
  const diningKeysC = diningKeys.slice(6, 9);

  return (
    <center>
      <img
        src="http://www.housing.ucla.edu/maps/ochmap.jpg"
        alt="Hill map"
        width="960"
        height="650"
        style={{ borderRadius: "20px" }}
      ></img>

      <div
        style={{
          marginTop: "50px",
          backgroundColor: "#2774ae",
          borderRadius: "10px",
          border: "1px solid",
          color: "#ffd100",
          width: "275px",
        }}
      >
        <h1>Housing</h1>
      </div>
      <Container
        className="d-flex justify-content-center"
        style={{ maxWidth: "60vw", paddingBottom: "40px" }}
      >
        <Col>
          <div style={{ marginTop: "25px" }}>
            {housingTitlesA.length !== 0
              ? housingTitlesA.map((title, idx) => (
                  <div className="homePageListElement" key={idx}>
                    <center>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/housing/" + housingKeysA[idx]}
                      >
                        <div className="d-flex justify-content-center">
                          <h4 style={{ color: "#FFD100" }}>{title}</h4>
                        </div>
                      </Link>
                    </center>
                  </div>
                ))
              : null}
          </div>
        </Col>
        <Col>
          <div style={{ marginTop: "25px" }}>
            {housingTitlesB.length !== 0
              ? housingTitlesB.map((title, idx) => (
                  <div className="homePageListElement" key={idx}>
                    <center>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/housing/" + housingKeysB[idx]}
                      >
                        <div className="d-flex justify-content-center">
                          <h4 style={{ color: "#FFD100" }}>{title}</h4>
                        </div>
                      </Link>
                    </center>
                  </div>
                ))
              : null}
          </div>
        </Col>
        <Col>
          <div style={{ marginTop: "25px" }}>
            {housingTitlesC.length !== 0
              ? housingTitlesC.map((title, idx) => (
                  <div className="homePageListElement" key={idx}>
                    <center>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/housing/" + housingKeysC[idx]}
                      >
                        <div className="d-flex justify-content-center">
                          <h4 style={{ color: "#FFD100" }}>{title}</h4>
                        </div>
                      </Link>
                    </center>
                  </div>
                ))
              : null}
          </div>
        </Col>
      </Container>
      <div
        style={{
          marginTop: "50px",
          backgroundColor: "#2774ae",
          borderRadius: "10px",
          border: "1px solid",
          color: "#ffd100",
          width: "275px",
        }}
      >
        <h1>Dining</h1>
      </div>
      <Container
        className="d-flex justify-content-center"
        style={{ maxWidth: "60vw", paddingBottom: "500px" }}
      >
        <Col>
          <div style={{ marginTop: "25px" }}>
            {diningTitlesA.length !== 0
              ? diningTitlesA.map((title, idx) => (
                  <div className="homePageListElement" key={idx}>
                    <center>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/dining/" + diningKeysA[idx]}
                      >
                        <div className="d-flex justify-content-center">
                          <h4 style={{ color: "#FFD100" }}>{title}</h4>
                        </div>
                      </Link>
                    </center>
                  </div>
                ))
              : null}
          </div>
        </Col>
        <Col>
          <div style={{ marginTop: "25px" }}>
            {diningTitlesB.length !== 0
              ? diningTitlesB.map((title, idx) => (
                  <div className="homePageListElement" key={idx}>
                    <center>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/dining/" + diningKeysB[idx]}
                      >
                        <div className="d-flex justify-content-center">
                          <h4 style={{ color: "#FFD100" }}>{title}</h4>
                        </div>
                      </Link>
                    </center>
                  </div>
                ))
              : null}
          </div>
        </Col>
        <Col>
          <div style={{ marginTop: "25px" }}>
            {diningTitlesC.length !== 0
              ? diningTitlesC.map((title, idx) => (
                  <div className="homePageListElement" key={idx}>
                    <center>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/dining/" + diningKeysC[idx]}
                      >
                        <div className="d-flex justify-content-center">
                          <h4 style={{ color: "#FFD100" }}>{title}</h4>
                        </div>
                      </Link>
                    </center>
                  </div>
                ))
              : null}
          </div>
        </Col>
      </Container>
    </center>
  );
};

export default HomePage;

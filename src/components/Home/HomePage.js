import { Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Displays Home (Home on the navbar or '/' as the path route)
// A list of dorm names is retrieved from index.js' initial DB call.

const HomePage = ({ housingTitles, keys }) => {
  const titlesA = housingTitles.slice(0, 8);
  const titlesB = housingTitles.slice(8, 16);
  const titlesC = housingTitles.slice(16, 24);
  const keysA = keys.slice(0, 8);
  const keysB = keys.slice(8, 16);
  const keysC = keys.slice(16, 24);

  return (
    <center>
      <img
        src="https://external-preview.redd.it/ZvJ-OZpSX3XQ1DsVzTyJ8qMl0fl95JxOrzma5dvcyJM.jpg?width=640&crop=smart&auto=webp&s=3f1f667ecc3c818a1cbe86897178f8b4c31b0794"
        alt="Hill map"
        width="960"
        height="650"
        style={{ borderRadius: "20px" }}
      ></img>

      <Container
        className="d-flex justify-content-center"
        style={{ maxWidth: "60vw", paddingBottom: "40px" }}
      >
        <Col>
          <div style={{ marginTop: "50px" }}>
            {titlesA.length !== 0
              ? titlesA.map((title, idx) => (
                  <div className="homePageListElement" key={idx}>
                    <center>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/" + keysA[idx]}
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
          <div style={{ marginTop: "50px" }}>
            {titlesB.length !== 0
              ? titlesB.map((title, idx) => (
                  <div className="homePageListElement" key={idx}>
                    <center>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/" + keysB[idx]}
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
          <div style={{ marginTop: "50px" }}>
            {titlesC.length !== 0
              ? titlesC.map((title, idx) => (
                  <div className="homePageListElement" key={idx}>
                    <center>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/" + keysC[idx]}
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

import { Card, Col, Row } from "react-bootstrap";

const RatingPlacard = ({ housingData }) => {
  return (
    <Card
      id="dormPlacard"
      style={{
        backgroundColor: "#2774AE",
        maxWidth: "60rem",
        minWidth: "50vw",
        minHeight: "24rem",
        border: "3px solid",
        color: "#FFD100",
        paddingTop: "10px",
        borderRadius: "10px",
      }}
    >
      <Card.Body>
        <Row>
          <Col>
            <div style={{ borderRight: "3px solid", paddingRight: "5px" }}>
              <Card.Title>
                <h2
                  className="text-center"
                  style={{ textDecorationLine: "underline" }}
                >
                  {housingData["title"]}
                </h2>
              </Card.Title>
              <br />
              <h4>
                {housingData["overallRating"]["totalReviewers"] > 0
                  ? "Overall Quality: " +
                    parseFloat(
                      housingData["overallRating"]["ratingSum"] /
                        housingData["overallRating"]["totalReviewers"]
                    ).toFixed(2)
                  : "Overall Quality n/a"}
              </h4>
              <br />
              <div className="placardFilters">
                <h5>
                  {housingData["essentialsQuality"]["totalReviewers"] > 0
                    ? "Quality of Essentials: " +
                      parseFloat(
                        housingData["essentialsQuality"]["ratingSum"] /
                          housingData["essentialsQuality"]["totalReviewers"]
                      ).toFixed(2)
                    : "Quality of Essentials: n/a"}
                </h5>
              </div>
              <div className="placardFilters">
                <h5>
                  {housingData["foodAccess"]["totalReviewers"] > 0
                    ? "Access to Food: " +
                      parseFloat(
                        housingData["foodAccess"]["ratingSum"] /
                          housingData["foodAccess"]["totalReviewers"]
                      ).toFixed(2)
                    : "Access to Food: n/a"}
                </h5>
              </div>
              <div className="placardFilters">
                <h5>
                  {housingData["noiseLevel"]["totalReviewers"] > 0
                    ? "Noise Level: " +
                      parseFloat(
                        housingData["noiseLevel"]["ratingSum"] /
                          housingData["noiseLevel"]["totalReviewers"]
                      ).toFixed(2)
                    : "Noise Level: n/a"}
                </h5>
              </div>
              <div className="placardFilters">
                <h5>
                  {housingData["parkingProximity"]["totalReviewers"] > 0
                    ? "Proximity to Parking: " +
                      parseFloat(
                        housingData["parkingProximity"]["ratingSum"] /
                          housingData["parkingProximity"]["totalReviewers"]
                      ).toFixed(2)
                    : "Proximity to Parking: n/a"}
                </h5>
              </div>
              <div className="placardFilters">
                <h5>
                  {housingData["uclaProximity"]["totalReviewers"] > 0
                    ? "Proximity to Campus: " +
                      parseFloat(
                        housingData["uclaProximity"]["ratingSum"] /
                          housingData["uclaProximity"]["totalReviewers"]
                      ).toFixed(2)
                    : "Proximity to Campus: n/a"}
                </h5>
              </div>
            </div>
          </Col>
          <Col>
            <center>
              <figure className="figure">
                <img
                  src={housingData["img"]}
                  className="figure-img img-fluid rounded"
                  alt={"A Photo of " + housingData["title"]}
                  style={{ maxHeight: "22rem" }}
                ></img>
              </figure>
            </center>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RatingPlacard;

import { Card, Col, Row } from "react-bootstrap";

// Create the placard that shows the dining option's
// ratings and photo using data passed to this
// element from DiningMainPage.js

const DiningRatingPlacard = ({ diningData }) => {
  return (
    <Card
      id="diningPlacard"
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
                  {diningData["title"]}
                </h2>
              </Card.Title>
              <br />
              <h4>
                {diningData["overallRating"]["totalReviewers"] > 0
                  ? "Overall Quality: " +
                    parseFloat(
                      diningData["overallRating"]["ratingSum"] /
                        diningData["overallRating"]["totalReviewers"]
                    ).toFixed(1)
                  : "Overall Quality: n/a"}
              </h4>
              <br />
              <div className="placardFilters">
                <h5>
                  {diningData["busyness"]["totalReviewers"] > 0
                    ? "Busyness: " +
                      parseFloat(
                        diningData["busyness"]["ratingSum"] /
                          diningData["busyness"]["totalReviewers"]
                      ).toFixed(1)
                    : "Busyness: n/a"}
                </h5>
              </div>
              <div className="placardFilters">
                <h5>
                  {diningData["cleanliness"]["totalReviewers"] > 0
                    ? "Cleanliness: " +
                      parseFloat(
                        diningData["cleanliness"]["ratingSum"] /
                          diningData["cleanliness"]["totalReviewers"]
                      ).toFixed(1)
                    : "Cleanliness: n/a"}
                </h5>
              </div>
              <div className="placardFilters">
                <h5>
                  {diningData["healthiness"]["totalReviewers"] > 0
                    ? "Healthiness: " +
                      parseFloat(
                        diningData["healthiness"]["ratingSum"] /
                          diningData["healthiness"]["totalReviewers"]
                      ).toFixed(1)
                    : "Healthiness: n/a"}
                </h5>
              </div>
              <div className="placardFilters">
                <h5>
                  {diningData["portionSize"]["totalReviewers"] > 0
                    ? "Portion Size: " +
                      parseFloat(
                        diningData["portionSize"]["ratingSum"] /
                          diningData["portionSize"]["totalReviewers"]
                      ).toFixed(1)
                    : "Portion Size: n/a"}
                </h5>
              </div>
              <div className="placardFilters">
                <h5>
                  {diningData["sittingSpace"]["totalReviewers"] > 0
                    ? "Sitting Space: " +
                      parseFloat(
                        diningData["sittingSpace"]["ratingSum"] /
                          diningData["sittingSpace"]["totalReviewers"]
                      ).toFixed(1)
                    : "Sitting Space: n/a"}
                </h5>
              </div>
            </div>
          </Col>
          <Col>
            <center>
              <figure className="figure">
                <img
                  src={diningData["img"]}
                  className="figure-img img-fluid rounded"
                  alt={"A Photo of " + diningData["title"]}
                  style={{ maxHeight: "22rem", maxWidth: "22rem" }}
                ></img>
              </figure>
            </center>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DiningRatingPlacard;

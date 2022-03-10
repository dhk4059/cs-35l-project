import { IoIosStar } from "react-icons/io";

// Takes in a firestore DB object and generates
// the written review left by each user, where each
// review is stored within the firestore DB call object.

const WrittenReviewCard = ({ firestoreObject }) => {
  const listStars = (num) => {
    if (num !== null) {
      let stars = Array(num);
      stars.fill(0);
      return (
        <div style={{ display: "flex", height: "20px" }}>
          {stars.map((_, index) => {
            return <IoIosStar key={index}></IoIosStar>;
          })}
        </div>
      );
    }
    return (
      <div style={{ display: "flex", height: "20px" }}>
        <h6 className="text-center">{"n/a"}</h6>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        maxWidth: "60rem",
        minWidth: "50vw",
        minHeight: "18rem",
        paddingTop: "40px",
        paddingBottom: "40px",
        paddingLeft: "60px",
        borderRadius: "5px",
        marginBottom: "30px",
        display: "flex",
      }}
    >
      <div
        id="textReview"
        style={{
          width: "50vw",
          maxWidth: "40rem",
          maxHeight: "24rem",
          minHeight: "20rem",
          paddingRight: "20px",
          borderRight: "5px solid #2774AE",
        }}
      >
        <div style={{ height: "30px" }}>
          <h6 style={{ fontWeight: "bold" }}>
            {firestoreObject["timestamp"].toDate().toDateString().slice(4)}
          </h6>
        </div>
        <div
          style={{
            overflowY: "auto",
            maxHeight: "22rem",
            minHeight: "20rem",
          }}
        >
          <h6 style={{ whiteSpace: "pre-line" }}>
            {firestoreObject["review"]}
          </h6>
        </div>
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          flexGrow: 1,
          marginRight: "20px",
          flexDirection: "column",
          maxHeight: "24rem",
          minHeight: "20rem",
          overflowY: "auto",
        }}
      >
        <h6 className="text-center">Overall Quality</h6>
        {listStars(firestoreObject["overallRating"])}
        <h6 className="text-center">Quality of Essentials</h6>
        {listStars(firestoreObject["essentialsQuality"])}
        <h6 className="text-center">Access to Food</h6>
        {listStars(firestoreObject["foodAccess"])}
        <h6 className="text-center">Noise Level</h6>
        {listStars(firestoreObject["noiseLevel"])}
        <h6 className="text-center">Proximity to Parking</h6>
        {listStars(firestoreObject["parkingProximity"])}
        <h6 className="text-center">Proximity to Campus</h6>
        {listStars(firestoreObject["uclaProximity"])}
      </div>
    </div>
  );
};

export default WrittenReviewCard;

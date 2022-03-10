import { firestore } from "../../../util/firebaseConfig";
import { useState, useEffect } from "react";
import WrittenReviewCard from "./WrittenReviewCard.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const WrittenReviews = ({ houseKey, resetList }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const allReviews = await getDocs(
        query(collection(firestore, houseKey), orderBy("timestamp", "desc"))
      );
      setAllReviews(
        allReviews.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(false);
    };

    getUsers();
    return () => {};
  }, [houseKey, resetList]);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: "10vh" }}
      >
        <h1 style={{ color: "white" }}>Retrieving Reviews...</h1>
      </div>
    );
  }
  return allReviews.length > 0
    ? allReviews.map((review, index) => {
        return (
          <WrittenReviewCard
            key={index}
            firestoreObject={review}
          ></WrittenReviewCard>
        );
      })
    : null;
};

export default WrittenReviews;

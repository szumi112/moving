import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(3);

  useEffect(() => {
    fetch("http://zulak-moving.onrender.com/reviews")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div className="reviews-container">
      <h1 className="reviews-heading">Opinie</h1>
      <ul className="reviews-list">
        {reviews.slice(0, showReviews).map((review) => (
          <li key={review._id} className="review">
            <div className="review-header">
              <h2 className="review-name">{review.name}</h2>
              <h2 className="review-date">{review.data}</h2>
            </div>
            <div className="review-stars">
              <img className="review-img" src={review.img} alt="ocena" />
            </div>
            <p className="review-text">{review.review}</p>
          </li>
        ))}
      </ul>
      <button
        className="reviews-button"
        onClick={() => setShowReviews(showReviews === 3 ? 8 : 3)}
      >
        {showReviews === 2 ? "Pokaż więcej" : "Pokaż mniej"}
      </button>
    </div>
  );
}

export default App;

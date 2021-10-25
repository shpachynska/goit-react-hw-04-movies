import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as API from "../../services/moviedb-api";

export default function Reviews({ movies }) {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    API.getMovieReviews(movieId).then((response) => {
      setReviews(response.results);
    });
  }, [movieId]);

  return (
    <>
      {reviews && (
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id}>
                <h4>{review.author}</h4>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

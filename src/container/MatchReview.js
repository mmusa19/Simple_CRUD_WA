import React, { useState, useEffect } from "react";
import Axios from "axios";

export const MatchReview = () => {
  const [matchName, setMatchName] = useState("");
  const [review, setReviewName] = useState("");
  const [matchList, setMatchList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMatchList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      matchName: matchName,
      matchReview: review,
    }).then(() => {
      alert("Successful insert");
    });
    setMatchList([...matchList, { matchName: matchName, matchReview: review }]);
  };

  const deleteReview = (matchName) => {
    Axios.delete(`http://localhost:3001/api/delete/${matchName}`);
  };

  const updateReview = (name) => {
    Axios.put("http://localhost:3001/api/update", {
      matchName: name,
      matchReview: newReview,
    });
    setNewReview("");
  };
  return (
    <div className="form">
      <label>Match Opponents:</label>
      <input
        type="text"
        name="matchOpponents"
        onChange={(e) => {
          setMatchName(e.target.value);
        }}
      />
      <label>Review:</label>
      <input
        type="text"
        name="review"
        onChange={(e) => {
          setReviewName(e.target.value);
        }}
      />

      <button onClick={submitReview}>Submit</button>
      {matchList.map((match) => {
        return (
          <div key={match.matchName} className="card">
            <h1>Match Name: {match.matchName} </h1>
            <p>Match Review: {match.matchReview} </p>
            <button onClick={() => deleteReview(match.matchName)}>
              Delete
            </button>
            <input
              type="text"
              className="updateInput"
              onChange={(e) => {
                setNewReview(e.target.value);
              }}
            />
            <button
              onClick={() => {
                updateReview(match.matchName);
              }}
            >
              Update
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MatchReview;

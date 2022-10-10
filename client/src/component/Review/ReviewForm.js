import React, { useContext, useState } from 'react'
import { UserContext, CodeContext } from "../../UserContext";

function ReviewForm({ codeId, setAddReview }) {
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(0)
  const { user } = useContext(UserContext);
  const { code } = useContext(CodeContext);
  const [errors, setErrors] = useState([]);
  // const [review_id, setReviewId] = useState(0)
  // const [code_id, setCodeId] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        rating,
        user_id: user.id,
        code_id: codeId
      }),
    })
      .then((r) => {
        // setIsSigningUp(false);
        if (r.ok) {
          r.json().then((user) => {
            console.log("SENT", r)
            // setUser(user);
            // navigate('/profile');
          })
        } else {
          r.json().then((err) => {
            console.log(err)
            setErrors(err.errors)
          })
        }

      });
  }

  return (
    <>
      <div className="nes-container is-rounded with-title">
        <h2 class="title">Review Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="nes-field">
            <label for="content">Your Review</label>
            <textarea type="text" value={content} onChange={(e) => setContent(e.target.value)} id="content" className="nes-textarea" />
          </div>
          <br />
          <label for="name_field">Rating (select one)</label>
          <div className="nes-field" style={{ display: "flex" }}>
            <label>
              <input type="radio" value="1" onChange={(e) => setRating(e.target.value)} className="nes-radio" name="rating" />
              <span>1</span>
            </label>

            <label>
              <input type="radio" value="2" onChange={(e) => setRating(e.target.value)} className="nes-radio" name="rating" />
              <span>2</span>
            </label>
            <label>
              <input type="radio" value="3" onChange={(e) => setRating(e.target.value)} className="nes-radio" name="rating" />
              <span>3</span>
            </label>
            <label>
              <input type="radio" value="4" onChange={(e) => setRating(e.target.value)} className="nes-radio" name="rating" />
              <span>4</span>
            </label>
            <label>
              <input type="radio" value="5" onChange={(e) => setRating(e.target.value)} className="nes-radio" name="rating" />
              <span>5</span>
            </label>
          </div>

          <div className="is-centered" style={{ marginBottom: "20px" }}>

            <div className="code-card-link">
              <button type="submit" style={{ marginRight: "20px !important" }} className="nes-btn is-success">Submit</button>&nbsp;
              <button type="button" onClick={() => setAddReview(false)} className="nes-btn is-warning">Go Back</button>
            </div>
          </div>

        </form>

      </div>
    </>
  )
}

export default ReviewForm
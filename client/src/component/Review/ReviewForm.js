import React from 'react'

function ReviewForm({ setAddReview }) {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <div className="nes-container is-rounded with-title">
        <h2 class="title">Review Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="nes-field">
            <label for="content">Your Review</label>
            <textarea type="text" id="content" className="nes-textarea" />
          </div>
          <br />
          <label for="name_field">Rating (select one)</label>
          <div className="nes-field" style={{ display: "flex" }}>
            <label>
              <input type="radio" className="nes-radio" name="rating" />
              <span>1</span>
            </label>

            <label>
              <input type="radio" className="nes-radio" name="rating" />
              <span>2</span>
            </label>
            <label>
              <input type="radio" className="nes-radio" name="rating" />
              <span>3</span>
            </label>
            <label>
              <input type="radio" className="nes-radio" name="rating" />
              <span>4</span>
            </label>
            <label>
              <input type="radio" className="nes-radio" name="rating" />
              <span>5</span>
            </label>
          </div>

        </form>

        <div className="is-centered" style={{ marginBottom: "20px" }}>

          <div className="code-card-link">
            <button type="submit" style={{ marginRight: "20px !important" }} onClick={() => console.log("Submit")} className="nes-btn is-success">Submit</button>&nbsp;
            <button type="button" onClick={() => setAddReview(false)} className="nes-btn is-warning">Go Back</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewForm
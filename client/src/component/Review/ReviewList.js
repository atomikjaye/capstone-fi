import React, { useState } from 'react'
import Review from './Review'
import ReviewForm from './ReviewForm'

export default function ReviewList({ codeId, reviews }) {
  const [addReview, setAddReview] = useState(false)


  const showReviews = reviews.map((review) => {
    console.log("REVIEW", review.user.username)
    return <Review
      review={review}
    />
    // return <Review user={review.users[0].username}
    // />
  })


  return (
    <>
      <div className="nes-container is-rounded with-title">
        <h2 className="title">Reviews</h2>
        <section classNAme="message-list">

          {showReviews}

        </section>
      </div>

      {!addReview ?
        <>
          {/* <div className="nes-container is-rounded with-title"> */}

          <div className="is-centered play-button" style={{ marginBottom: "80px" }}>

            <div className="code-card-link">
              <button type="button" onClick={() => setAddReview(true)} class="nes-btn is-warning">Write a Review!</button>
            </div>
          </div>
          {/* </div> */}
        </> :
        <>
          <ReviewForm codeId={codeId} setAddReview={setAddReview} />
        </>
      }

    </>
  )
}

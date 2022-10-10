import React, { useEffect, useState } from 'react'
import Review from './Review'
import ReviewForm from './ReviewForm'

export default function ReviewList({ codeId }) {
  const [addReview, setAddReview] = useState(false)
  const [reviews, setReviews] = useState([])
  // const 

  //useEffecrt runs once on render
  // Fetch all reviews that exist
  // Set to variable
  // All reviews.filter filter vs codeBlock Id and ref ID
  // Render reviews

  useEffect(() => {
    fetch(`/codes/${codeId}`)
      .then((r) => r.json())
      .then((codeBlock) => setReviews(codeBlock.reviews))



    // fetch("/me").then((r) => {
    //   if (r.ok) {
    //     r.json().then((user) => {
    //       console.log(user);
    //       setUser(user)
    //     });
    //   } else {
    //     console.log("/me: No user set");
    //   }



  }, [])


  const showReviews = reviews.map((review) => {
    console.log("REVIEW", review.user.username)
    return <Review
      key={review.id}
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

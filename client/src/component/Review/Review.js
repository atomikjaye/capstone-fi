import React, { useContext, useState } from 'react'
import "./Review.css"
import { Route, useLocation, Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import ReviewForm from './ReviewForm';
import { UserContext } from "../../UserContext";

export default function Review({ review }) {
  const [isEditting, setIsEditting] = useState(false);
  const [content, setContent] = useState(review.content)
  const [rating, setRating] = useState(review.rating)
  const { user } = useContext(UserContext);


  const revUser = review.user;

  console.log(review)
  const { pathname } = useLocation();
  // const stars = () => {
  //   let starsArr = [];
  //   for (let index = 0; index < review.rating; index++) {
  //     starsArr += <i className="nes-icon is-large star"></i>
  //     console.log(starsArr)
  //     return starsArr
  //   }
  // }

  const handleDelete = () => {

    fetch(`/reviews/${review.id}`, {
      method: "DELETE",
    }).then(r => r.json)
      .then(data => {
        console.log("Successfully deleted: ", data)
        window.location.reload()
      })


  }

  const handleEdit = () => {
    fetch(`/reviews/${review.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        content,
        rating
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => window.location.reload());
  }




  return (
    <>
      <section className="review message-left">
        <img src={revUser.avatar_url} className="avatar-url" />

        <div className="nes-balloon from-left">
          {isEditting ?
            <>
              <form>
                <label for="content">Edit Review</label>
                <textarea type="text" value={content} onChange={(e) => setContent(e.target.value)} id="content" className="nes-textarea" />
                <br />
                <label for="name_field">Edit Rating (select one)</label>
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
              </form>

            </> :
            <>
              <p className="content">{review.content}</p>
              <section className="icon-list">
                {[...Array(review.rating)].map((star) => {

                  return <i className="nes-icon star is-small"></i>
                })}
              </section>
            </>
          }
          <div className="username">{revUser.username}</div>
          <div className="timestamp">
            {/* <Moment fromNow>
              {review.updated_at}
            </Moment> */}

            {review.created_at.valueOf() !== review.updated_at.valueOf() ?
              <> edited:&nbsp;
                <Moment fromNow>
                  {review.updated_at}
                </Moment>
              </>
              :
              <Moment fromNow>
                {review.created_at}
              </Moment>
            }
          </div>

          {user.id == review.user.id ?
            <>
              <div className="toolbar">
                {isEditting ?
                  <>
                    <button type="button" className="nes-btn is-success" onClick={() => handleEdit()}>Submit Edit</button>
                    <button type="button" className="nes-btn is-error" onClick={() => setIsEditting(!isEditting)}>Go Back</button>
                  </>
                  :
                  <>
                    <button type="button" className="nes-btn is-success" onClick={() => setIsEditting(!isEditting)}>Edit</button>
                    <button type="button" className="nes-btn is-error" onClick={() => handleDelete()}>Delete</button>
                  </>
                }
              </div>
            </> :
            <></>
          }
        </div>
      </section>
    </>
  )
}

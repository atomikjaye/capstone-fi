import React, { useState } from 'react'
import "./Review.css"
import { Route, useLocation, Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import ReviewForm from './ReviewForm';

export default function Review({ review }) {

  const user = review.users[0];

  const { pathname } = useLocation();
  // const stars = () => {
  //   let starsArr = [];
  //   for (let index = 0; index < review.rating; index++) {
  //     starsArr += <i class="nes-icon is-large star"></i>
  //     console.log(starsArr)
  //     return starsArr
  //   }
  // }

  return (
    <>
      <section class="review message-left">
        <img src={user.avatar_url} className="avatar-url" />

        <div class="nes-balloon from-left">
          <p className="content">{review.content}</p>
          <div className="username">{user.username}</div>
          <div class="timestamp">
            <Moment fromNow>
              {review.updated_at}
            </Moment>
          </div>
          <section class="icon-list">
            {[...Array(review.rating)].map((star) => {

              return <i class="nes-icon star is-small"></i>
            })}
          </section>

        </div>
      </section>
    </>
  )
}

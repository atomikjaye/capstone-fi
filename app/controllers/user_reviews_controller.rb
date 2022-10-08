class UserReviewsController < ApplicationController
  # POST /reviews
  def create
    @user_review = UserReview.new(user_review_params)

    if @user_review.save
      render json: @user_review, status: :created, location: @user_review
    else
      render json: @user_review.errors, status: :unprocessable_entity
    end
  end

  private
  # Only allow a list of trusted parameters through.
  def user_review_params
    params.require(:user_review).permit(:user_id, :review_id, :code_id)
  end
end

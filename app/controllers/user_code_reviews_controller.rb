class UserCodeReviewsController < ApplicationController
  before_action :set_user_code_review, only: %i[ show update destroy ]

  # GET /user_code_reviews
  # def index
  #   @user_code_reviews = UserCodeReview.all

  #   render json: @user_code_reviews
  # end

  # # GET /user_code_reviews/1
  # def show
  #   render json: @user_code_review
  # end

  # POST /user_code_reviews
  def create
    @user_code_review = UserCodeReview.new(user_code_review_params)

    if @user_code_review.save
      render json: @user_code_review, status: :created, location: @user_code_review
    else
      render json: @user_code_review.errors, status: :unprocessable_entity
    end
  end

  # # PATCH/PUT /user_code_reviews/1
  # def update
  #   if @user_code_review.update(user_code_review_params)
  #     render json: @user_code_review
  #   else
  #     render json: @user_code_review.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /user_code_reviews/1
  def destroy
    @user_code_review.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_code_review
      @user_code_review = UserCodeReview.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_code_review_params
      params.require(:user_code_review).permit(:user_id, :review_id, :code_id)
    end
end

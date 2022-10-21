class UsersController < ApplicationController

  skip_before_action :authorize, only: [:create, :index]

  def index
    users = User.all
    # byebug
    render json:users
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    render json: @current_user
  end
   # PATCH/PUT /codes/1
   def update
    if user.update(user_params)
      render json: user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :first_name, :email, :avatar_url, :password, :password_confirmation, :is_admin, :points)
    end
end

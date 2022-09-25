class UsersController < ApplicationController
  # THIS WORKED
  # def create
  #   user = User.create(user_params)
  #   if user.valid?
  #     render json: user, status: :created
  #   else
  #     render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
  #   end
  # end

  # def show
  #   user = User.find_by(id: session[:user_id])
  #   if user
  #     render json: user
  #   else
  #     render json: { error: "Not authorized" }, status: :unauthorized
  #   end
  # end
  # END OF THIS WORKED

  skip_before_action :authorize, only: :create

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    render json: @current_user
  end

  private
    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :first_name, :email, :avatar_url, :password, :password_confirmation, :is_admin, :points)
    end
end

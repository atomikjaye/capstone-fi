class ApplicationController < ActionController::API
  include ActionController::Cookies
  # before_action :authorize


  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  before_action :authorize

  # def authorize
  #   @current_user = User.find_by(id: session[:user_id])
  #   render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  # end

  # def record_not_valid(invalid)
  #   render json: { errors: invalid.record.errors.full_messages }, status: 422
  # end

  # def record_not_found(invalid)
  #   render json: { error: "#{invalid.model} not found" }, status: 404
  # end




  private

  def authorize
    @current_user = User.find_by(id: session[:user_id])

    render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

end
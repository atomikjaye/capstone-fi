class TopicsController < ApplicationController
  skip_before_action :authorize
  def index
    @topics = Topic.all
    render json: @topics
  end

  def show
    render json: @topic
  end

  def create
    topic = User.create!(topic_params)
    render json: user, status: :created
  end

  def destroy
    @topic.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_topic
      @topic = Topic.find(params[:id])
    end

    def topic_params
      params.permit(:name)
    end


end

class CodeTopicsController < ApplicationController
  skip_before_action :authorize
  def index
    @code_topics = CodeTopic.all

    render json: @code_topics
  end

  def create
    code_topic = CodeTopic.create!(code_topic_params)
    render json: code_topic, status: :created
  end

  def destroy
    @code_topic.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_code_topic
      @code_topic = CodeTopic.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def code_topic_params
      params.permit(:code_id, :topic_id)
    end

end

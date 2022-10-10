class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :rating, :user_id, :user, :code, :created_at, :updated_at

  belongs_to :user
  belongs_to :code
end

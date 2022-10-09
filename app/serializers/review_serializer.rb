class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :rating, :users, :created_at, :updated_at

  has_many :user_code_reviews
  has_one :users
end

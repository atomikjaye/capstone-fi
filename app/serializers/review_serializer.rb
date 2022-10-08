class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :rating

  has_many :user_reviews
  has_many :users
end

class Code < ApplicationRecord

  has_many :user_code_reviews
  has_many :reviews, through: :user_code_reviews
  has_many :users, through: :user_code_reviews

  # has_many :code_topics
  # has_many :topics, through: :code_topics
end

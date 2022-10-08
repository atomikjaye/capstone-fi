class Review < ApplicationRecord

  has_many :user_code_reviews
  has_many :users, through: :user_code_reviews
  # has_many :code_reviews
  has_many :codes, through: :user_code_reviews
end

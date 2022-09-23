class Review < ApplicationRecord

  has_many :user_reviews
  has_many :users, through: :user_reviews
  has_many :code_reviews
  has_many :codes, through: :code_reviews
end

class Review < ApplicationRecord
  # accepts_nested_attributes_for :user_code_review

  has_many :user_code_reviews
  has_many :users, through: :user_code_reviews
  # has_many :code_reviews
  has_many :codes, through: :user_code_reviews
end

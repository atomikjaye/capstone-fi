class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: true

  has_many :user_reviews
  has_many :reviews, through: :user_reviews
end

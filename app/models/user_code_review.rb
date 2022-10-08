class UserCodeReview < ApplicationRecord
  belongs_to :user
  belongs_to :review
  belongs_to :code
end

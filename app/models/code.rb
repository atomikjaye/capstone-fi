class Code < ApplicationRecord

  has_many :reviews
  has_many :users, through: :reviews

  # has_many :code_topics
  # has_many :topics, through: :code_topics
end

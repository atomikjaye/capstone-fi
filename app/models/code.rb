class Code < ApplicationRecord

  has_many :code_reviews
  has_many :reviews, :through :code_reviews
  
  has_many :code_topics
  has_many :topics, :through :code_topics
end

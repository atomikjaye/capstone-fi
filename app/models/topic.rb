class Topic < ApplicationRecord
  has_many :code_topics
  has_many :codes, :through :code_topics
end

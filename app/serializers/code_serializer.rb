class CodeSerializer < ActiveModel::Serializer
  attributes :id, :code_block, :is_hard, :points, :lang

  has_many :user_code_reviews
  has_many :users, through: :user_code_reviews
  has_many :reviews
end

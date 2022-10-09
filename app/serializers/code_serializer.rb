class CodeSerializer < ActiveModel::Serializer
  attributes :id, :code_block, :is_hard, :points, :lang

  has_many :reviews
  has_many :users, through: :reviews
end

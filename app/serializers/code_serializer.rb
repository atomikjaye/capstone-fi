class CodeSerializer < ActiveModel::Serializer
  attributes :id, :code_block, :is_hard, :points, :lang
end

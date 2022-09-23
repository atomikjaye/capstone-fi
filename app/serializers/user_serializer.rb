class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :email, :avatar_url, :password_digest, :is_admin, :points
end

class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :email, :avatar_url, :password_digest, :is_admin, :points

  has_many :user_reviews
  has_many :reviews

end

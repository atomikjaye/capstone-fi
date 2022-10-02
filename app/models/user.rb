require 'faker'
class User < ApplicationRecord
  # Setting avatar_url to default value if not added

  after_initialize :set_defaults, unless: :persisted?

  has_secure_password
  validates :username, presence: true, uniqueness: true
  # validates :first_name, presence: {message: 'First Name cannot be empty'} 
  validate :has_first_name
  
  has_many :user_reviews
  has_many :reviews, through: :user_reviews

  private 
  def has_first_name
    errors.add(:base, 'First Name can\'t be blank') if first_name.blank?
  end
  def set_defaults
    self.avatar_url  ||= Faker::Avatar.image(slug: self.username + " profile-pic") #=> "https://robohash.org/my-own-slug.png?size=300x300&set=set1"'
  end
end

class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: true
  # validates :first_name, presence: {message: 'First Name cannot be empty'} 
  validate :has_first_name
  
  has_many :user_reviews
  has_many :reviews, through: :user_reviews

  private 
  def has_first_name
    errors.add(:base, 'First Name cannot be blank') if first_name.blank?
  end
end

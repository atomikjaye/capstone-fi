# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'faker'

User.destroy_all
Review.destroy_all
UserReview.destroy_all

response = HTTParty.get('https://codicocodes.github.io/speedtyper-community/index.json');
raw_code = HTTParty.get(JSON.parse(response.body)[0]["source"]);
byebug

def createUser
  username = Faker::Internet.username
  first_name = Faker::Name.first_name
  email = Faker::Internet.email
  avatar_url = Faker::Avatar.image
  password = Faker::Internet.password
  is_admin = false
  points = Faker::Number.number(digits: 5)
  # Return object
  {
    username: username,
    first_name: first_name,
    email: email,
    avatar_url: avatar_url,
    password: password,
    is_admin: is_admin,
    points: points
  }
end

# def createTopics
#   Topic.create({ name: "data type" })
#   Topic.create({ name: "variables" })
#   Topic.create({ name: "conditionals" })
#   Topic.create({ name: "arrays" })
#   Topic.create({ name: "loops" })
#   Topic.create({ name: "functions" })
#   Topic.create({ name: "class" })
#   Topic.create({ name: "objects" })
  
# end

def createReviews
  content = Faker::Lorem.paragraph(sentence_count: 2, supplemental: true, random_sentences_to_add: 4) 
  rating = Faker::Number.within(range: 1.0..5.0)
  {
    content: content,
    rating: rating
  }
end

# def createCode
#   code_block
# end

10.times {
  user = User.create(createUser)
  review = Review.create(createReviews)
  user_review = UserReview.create(
    {
      user_id: user.id,
      review_id: review.id
    }
  )
    # createTopics();

}
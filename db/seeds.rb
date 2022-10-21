# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'faker'
require 'json'

User.destroy_all
Review.destroy_all


def createUser
  username = Faker::Internet.username
  first_name = Faker::Name.first_name
  email = Faker::Internet.email
  avatar_url = Faker::Avatar.image
  password = Faker::Internet.password
  is_admin = false
  points = Faker::Number.number(digits: 5)
  # Return object
  # avatar_url: avatar_url.delete "size=50x50",
  {
    username: username,
    first_name: first_name,
    email: email,
    avatar_url: avatar_url.gsub("size=300x300", ""),
    password: password,
    is_admin: is_admin,
    points: points
  }
end

def createTopics
  Topic.create({ name: "data type" })
  Topic.create({ name: "variables" })
  Topic.create({ name: "conditionals" })
  Topic.create({ name: "arrays" })
  Topic.create({ name: "loops" })
  Topic.create({ name: "functions" })
  Topic.create({ name: "class" })
  Topic.create({ name: "objects" })  
end





def createReviews(user_id, code_id)
  content = Faker::Lorem.paragraph(sentence_count: 2, supplemental: true, random_sentences_to_add: 4) 
  rating = Faker::Number.within(range: 1.0..5.0)
  {
    content: content,
    rating: rating,
    code_id: code_id,
    user_id: user_id
  }
end

# Example of getting code
# response = HTTParty.get('https://raw.githubusercontent.com/atomikjaye/capstone-fi/main/codeBlockUrls.json');
# responseBody = HTTParty.get(response.body);
# raw_code = HTTParty.get(JSON.parse(response.body)[0]["source"]);
# byebug
createTopics();

def createCode
  response = HTTParty.get('https://raw.githubusercontent.com/atomikjaye/capstone-fi/main/codeBlockUrls.json');
  responseBody = JSON.parse(response.body)
  for index in responseBody
    # byebug
    codeResponse = HTTParty.get(index["source"])
    # byebug
    codeBody = codeResponse.body
    # byebug
    codeBlock = Code.create({
      code_block: codeBody,
      is_hard: [true, false].sample,
      points: Faker::Number.within(range: 300..1000),
      lang: index["language"]
    })
    # pp codeBlock
    codeTopic = CodeTopic.create(
    {
      code_id: codeBlock.id, 
      topic_id: rand(1..7)
    })
  end

end


createCode();

10.times {
|index|
# byebug
  user = User.create(createUser)
  review = Review.create(createReviews(user.id, index))

  # byebug
  # user_code_review = UserCodeReview.create(
  #   {
  #     user_id: user.id,
  #     review_id: review.id,
  #     code_id: index
  #   }
  # )
    # createTopics();

}
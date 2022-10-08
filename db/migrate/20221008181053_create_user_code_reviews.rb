class CreateUserCodeReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :user_code_reviews do |t|
      t.integer :user_id
      t.integer :review_id
      t.integer :code_id

      t.timestamps
    end
  end
end

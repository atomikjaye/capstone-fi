class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :first_name
      t.string :email
      t.string :avatar_url
      t.string :password_digest
      t.boolean :is_admin
      t.integer :points

      t.timestamps
    end
  end
end

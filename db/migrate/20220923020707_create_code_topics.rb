class CreateCodeTopics < ActiveRecord::Migration[7.0]
  def change
    create_table :code_topics do |t|
      t.integer :code_id
      t.integer :topic_id
      t.timestamps
    end
  end
end

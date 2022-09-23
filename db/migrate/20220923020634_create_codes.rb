class CreateCodes < ActiveRecord::Migration[7.0]
  def change
    create_table :codes do |t|
      t.string :code_block
      t.boolean :is_hard
      t.integer :points
      t.string :lang

      t.timestamps
    end
  end
end

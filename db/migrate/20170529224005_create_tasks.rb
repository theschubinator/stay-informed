class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :description
      t.boolean :complete, default: false
      t.datetime :due_date
      t.integer :user_id

      t.timestamps
    end
  end
end

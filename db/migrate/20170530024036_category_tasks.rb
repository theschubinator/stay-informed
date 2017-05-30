class CategoryTasks < ActiveRecord::Migration[5.0]
  def change
  	create_table :category_tasks do |t|
  		t.integer :category_id
  		t.integer :task_id
  	end
  end
end

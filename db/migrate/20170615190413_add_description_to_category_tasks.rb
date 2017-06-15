class AddDescriptionToCategoryTasks < ActiveRecord::Migration[5.0]
  def change
  	add_column :category_tasks, :description, :string 
  end
end

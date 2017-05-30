class AddGroupedToTasks < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :grouped, :boolean, default: false
  end
end

class Category < ApplicationRecord
	has_many :category_tasks
	has_many :tasks, through: :category_tasks
	has_many :users, through: :tasks

	def self.user_tasks(user, category)
		category.tasks.where("user_id = ?", user.id)
	end

end

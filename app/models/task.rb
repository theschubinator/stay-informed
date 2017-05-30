class Task < ApplicationRecord
	belongs_to :user
	has_many :category_tasks
	has_many :categories, through: :category_tasks

	def formatted_date(date)
		due_date.strftime("%a. %B, %e %Y at %I:%M%p")
	end

	def category=(category)
		new_category = Category.find_or_create_by(category)
		self.categories << new_category
	end



	def self.sorted_by_due_date(tasks)
		tasks.sort_by {|task| task.due_date }
	end
end

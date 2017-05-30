class Task < ApplicationRecord
	belongs_to :user
	has_many :category_tasks
	has_many :categories, through: :category_tasks

	def formatted_date(date)
		due_date.strftime("%a. %B, %e %Y at %I:%M%p")
	end
end

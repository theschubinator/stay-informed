class Task < ApplicationRecord
	belongs_to :user
	has_many :category_tasks
	has_many :categories, through: :category_tasks
#	accepts_nested_attributes_for :categories

	def formatted_date(date)
		due_date.strftime("%a. %B, %e %Y at %I:%M%p")
	end

	def category=(category)
		new_category = Category.find_or_create_by(category)
		self.categories << new_category
	end
end

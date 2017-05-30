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



	def self.sorted_by_due_date(user_tasks)
		user_tasks.sort_by {|task| task.due_date }
	end

	def self.incompleted(user_tasks)
		tasks = self.sorted_by_due_date(user_tasks)
		incomplete_tasks = []
		tasks.each do |task|
			incomplete_tasks << task if !task.complete
	    end
	    incomplete_tasks
	end

	def self.completed(user_tasks)
		tasks = self.sorted_by_due_date(user_tasks)
		completed_tasks = []
		tasks.each do |task|
			completed_tasks << task if task.complete
		end
		completed_tasks
	end

end

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

	def category_ids=(category_ids)
		binding.pry
		category_ids.each do |category_id|
			if !category_id.empty?
			  category = Category.find(category_id)
			  self.categories << category
			end
		end
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

	def self.overdue_tasks(user_tasks)
		tasks = self.incompleted(user_tasks)
		over_due_tasks = []
		tasks.each do |task|
			if Time.current > task.due_date
				over_due_tasks << task
			end
		end
		over_due_tasks
	end

end

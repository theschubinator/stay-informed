class Task < ApplicationRecord
	belongs_to :user
	has_many :category_tasks
	has_many :categories, through: :category_tasks
    accepts_nested_attributes_for :categories

	validates :name, :description, :categories, presence: true
	validate :date?
	#validate :category?

	def date?
	  if Time.now > due_date
	  	errors.add(:due_date, "must be after current time.")
	  end
	end

	def category?
		binding.pry
	end 

	def formatted_date(date)
		due_date.strftime("%a. %B, %e %Y at %I:%M%p")
	end

	def categories_attributes=(categories_attributes)
		categories_attributes.values.each do |categories_attribute|
			if !categories_attribute[:name].empty?
			  category = Category.find_or_create_by(categories_attribute)
			  self.categories << category
			end
		end	
	end

	def category_ids=(category_ids)
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

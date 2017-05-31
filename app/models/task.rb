class Task < ApplicationRecord
	belongs_to :user
	has_many :category_tasks
	has_many :categories, through: :category_tasks
    accepts_nested_attributes_for :categories

	validates :name, :description, :categories, presence: true
	validate :date?

	## validations ##
	def date?
	  if Time.now > due_date
	  	errors.add(:due_date, "must be after current time.")
	  end
	end

	## custom_writers ##
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
			  self.categories << category if !self.categories.include?(category)
			end
		end
	end

	## class methods ##
	def self.sorted_by_due_date(user_tasks)
		user_tasks.sort_by {|task| task.due_date }
	end

	def self.incompleted(user_tasks)
		 incomplete_tasks = user_tasks.where("complete = ?", false)
		 incomplete_tasks.sort_by { |task| task.due_date }
	end

	def self.completed(user_tasks)
		completed_tasks = user_tasks.where("complete = ?", true)
		completed_tasks.sort_by { |task| task.due_date }
	end

	def self.overdue_tasks(user_tasks)
		tasks = self.incompleted(user_tasks)
		over_due_tasks = []
		tasks.each do |task|
	      over_due_tasks << task if (Time.current > task.due_date)
		end
		over_due_tasks
	end

	def self.grouped
		self.all.where("grouped = ?", true)
	end

	## instance methods ##
	def formatted_date(date)
		due_date.strftime("%a. %B, %e %Y at %I:%M%p")
	end
	
end

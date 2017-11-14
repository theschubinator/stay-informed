class Task < ApplicationRecord
	belongs_to :user
	has_many :category_tasks
	has_many :categories, through: :category_tasks
    # accepts_nested_attributes_for :categories

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

	def join_description=(join_description)
		if !join_description[:description].empty?
			self.category_tasks.each do |category_task|
				category_task.description = join_description[:description]
				category_task.save
			end
		end
	end

	## class methods ##
	def self.sorted_by_due_date(tasks)
		tasks.sort_by {|task| task.due_date }
	end

	def self.incompleted(tasks)
		 incomplete_tasks = tasks.where("complete = ?", false)
		 incomplete_tasks.sort_by { |task| task.due_date }
	end

	def self.completed(tasks)
		completed_tasks = tasks.where("complete = ?", true)
		completed_tasks.sort_by { |task| task.due_date }
	end

	def self.overdue_tasks(tasks)
		  overdue_tasks = tasks.where("due_date < ?", Time.current)
		  overdue_tasks.incompleted(overdue_tasks)
	end

	def self.grouped
		self.all.where("grouped = ?", true)
	end

	## instance methods ##
	def formatted_date(date)
		due_date.strftime("%a. %B, %e %Y at %I:%M%p")
	end
	
end

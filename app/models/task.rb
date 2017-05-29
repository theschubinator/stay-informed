class Task < ApplicationRecord
	belongs_to :user

	def formatted_date(date)
		due_date.strftime("%a. %B, %e %Y at %I:%M%p")
	end
end

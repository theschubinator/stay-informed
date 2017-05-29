class StaticController < ApplicationController
	def index
		redirect_to user_tasks_path(current_user) if current_user
	end
end

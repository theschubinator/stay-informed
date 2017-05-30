class StaticController < ApplicationController
	def index
		redirect_to user_tasks_path(current_user) if logged_in?
	end
end

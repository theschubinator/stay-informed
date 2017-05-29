class TasksController < ApplicationController
	def index
	end

	def new
		@tast = Task.new
	end

	def create
	end
end

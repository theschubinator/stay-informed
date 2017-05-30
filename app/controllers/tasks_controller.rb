class TasksController < ApplicationController
	def index
		@tasks = user_tasks
	end

	def new
		@task = Task.new
	end

	def create
		binding.pry
		user_tasks.build(task_params)
		current_user.save
		redirect_to user_tasks_path(current_user)
	end

	private
	  def task_params
	  	params.require(:task).permit(:name, :description, :"due_date(1i)", :"due_date(2i)", :"due_date(3i)", :"due_date(4i)", :"due_date(5i)", category_ids: [])
	  end

	  def user_tasks
	  	current_user.tasks
	  end
end

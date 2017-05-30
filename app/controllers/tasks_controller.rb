class TasksController < ApplicationController
	def index
		@incomplete_tasks = Task.incompleted(user_tasks)
		@completed_tasks = Task.completed(user_tasks)
	end

	def new
		@task = Task.new
	end

	def create
		user_tasks.build(task_params)
		current_user.save
		redirect_to user_tasks_path(current_user)
	end

	def update
		@task = Task.find(params[:id])
		@task.update(task_params)
		redirect_to user_tasks_path(current_user)
	end

	def completed_tasks
	  	@completed_tasks = Task.completed(user_tasks)
	end

	private
	  def task_params
	  	params.require(:task).permit(:name, :description, :complete, :"due_date(1i)", :"due_date(2i)", :"due_date(3i)", :"due_date(4i)", :"due_date(5i)", category_ids: [], category: [:name])
	  end

	  def user_tasks
	  	current_user.tasks
	  end
end

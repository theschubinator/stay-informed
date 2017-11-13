class TasksController < ApplicationController

	def index
		if user_authorized?
		  @incomplete_tasks = Task.incompleted(user_tasks)
		  respond_to do |f|
		  	f.html {render :index}
		  	f.json {render json: @incomplete_tasks}
		  end

		  # render json: @incomplete_tasks
		  # @completed_tasks = Task.completed(user_tasks)
		else
			flash[:alert] = "You do not have the authorization to view this page."
			redirect_to root_path
		end
	end

	def new
		if user_authorized?
		  @task = Task.new
		  render layout: false
		else
		  	flash[:alert] = "You do not have the authorization to view this page."
			redirect_to root_path
		end
	end

	def create
		if user_authorized?
		  @task = user_tasks.build(task_params)
		  if @task.save
		  	render json: @task, status:201
		    # redirect_to user_tasks_path(current_user)
		  else
	        flash[:alert] = @task.errors.full_messages.join(" & ")
					render 'new'
		  end
    else
    flash[:alert] = "You do not have the authorization to view this page."
	  redirect_to root_path
    end
	end

	def show
		if user_authorized?
		  find_task
		  respond_to do |f|
		  	f.html {render :show}
		  	f.json {render json: @task}
		  end
		else
		  flash[:alert] = "You do not have the authorization to view this page."
		  redirect_to root_path
		end
	end

	def edit
	  if user_authorized?
		find_task
	  else
	  flash[:alert] = "You do not have the authorization to view this page."
		redirect_to root_path
	  end
	end

	def update
	  if user_authorized?
		find_task
		@task.update(task_params)
		render json: @task
		# redirect_to user_tasks_path(current_user)
	  else
	  	flash[:alert] = "You do not have the authorization to view this page."
		redirect_to root_path
	  end
	end

	def destroy
		if user_authorized?
		  find_task
		  @task.destroy
		  redirect_to user_tasks_path(current_user)
		else
		  flash[:alert] = "You do not have the authorization to view this page."
		  redirect_to root_path
		end
	end

	def completed_tasks
	  if user_authorized?
	  	@completed_tasks = Task.completed(user_tasks)
	  else
	  	flash[:alert] = "You do not have the authorization to view this page."
		redirect_to root_path
	  end
	end

	private
	  def task_params
	  	params.require(:task).permit(:name, :description, :complete, :"due_date(1i)", :"due_date(2i)", :"due_date(3i)", :"due_date(4i)", :"due_date(5i)", category_ids: [], categories_attributes: [:name], join_description: [:description])
	  end

	  def user_tasks
	  	current_user.tasks
	  end

	  def find_task
	  	@task = Task.find(params[:id])
	  end
end

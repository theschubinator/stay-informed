class AdminController < ActionController::Base
	layout 'application'

	def users
		@users = User.all
	end

	def new_task
		@task = Task.new
	end

	def create_task
	  user_group.each do |user_id|
	  	if !user_id.empty?
	  		user = User.find(user_id)
	  		user.tasks.build(task_params)
	  		if !user.save
	  		  flash[:alert] = user.tasks.last.errors.full_messages.join(" & ")
			  redirect_to new_admin_task_path(current_user) and return
		    end
	  	end
	  end
	  redirect_to user_tasks_path(current_user)		  
	end

	def group_tasks
		@tasks = Task.grouped
	end

	private
	  def task_params
	  	params.require(:task).permit(:name, :grouped, :description, :complete, :"due_date(1i)", :"due_date(2i)", :"due_date(3i)", :"due_date(4i)", :"due_date(5i)", category_ids: [], categories_attributes: [:name])
	  end

	  def user_group
	  	params[:task][:user_id]
	  end
end
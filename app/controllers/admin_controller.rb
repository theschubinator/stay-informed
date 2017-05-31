class AdminController < ActionController::Base
	layout 'application'

	def users
		if current_user.admin?
		  @users = User.all
		else
	      flash[:alert] = "You do not have the authorization to view this page."
	      redirect_to root_path
	    end
	end

	def new_task
		if current_user.admin?
		  @task = Task.new
		else
		  flash[:alert] = "You do not have the authorization to view this page."
	      redirect_to root_path
	    end
	end

	def create_task
	  if current_user.admin?
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
	   else  
	     flash[:alert] = "You do not have the authorization to view this page."
	     redirect_to root_path
	   end
	end

	def group_tasks
		if current_user.admin?
		  @tasks = Task.grouped
		else
		  flash[:alert] = "You do not have the authorization to view this page."
	      redirect_to root_path
	    end
	end

	private
	  def task_params
	  	params.require(:task).permit(:name, :grouped, :description, :complete, :"due_date(1i)", :"due_date(2i)", :"due_date(3i)", :"due_date(4i)", :"due_date(5i)", category_ids: [], categories_attributes: [:name])
	  end

	  def user_group
	  	params[:task][:user_id]
	  end
end
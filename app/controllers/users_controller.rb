class UsersController < ApplicationController

	def show
			if current_user == User.find_by(id: params[:id]) || current_user.admin?
		  @user = User.find(params[:id])
		else
		  flash[:alert] = "You do not have the authorization to view this page."
		  redirect_to root_path
		end
	end

	def profile
		if current_user == User.find_by(id: params[:user_id]) || current_user.admin?
		  @user = User.find(params[:user_id])
		else
		  flash[:alert] = "You do not have the authorization to view this page."
		  redirect_to root_path
		end
	end

	def update
		if current_user == User.find_by(id: params[:id]) || current_user.admin?
		  @user = User.find(params[:id])
		  @user.role = params[:user][:role].to_i
		  @user.save
		  redirect_to user_path(@user)
		else
		  flash[:alert] = "You do not have the authorization to view this page."
		  redirect_to root_path
		end
	end
end
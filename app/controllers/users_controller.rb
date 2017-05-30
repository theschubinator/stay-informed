class UsersController < ApplicationController

	# Could not authenticate you from Facebook because "Csrf detected".
	def show
		if current_user == User.find_by(id: params[:id])
		  @user = current_user
		else
		  flash[:alert] = "You do not have the authorization to view this page."
		  redirect_to root_path
		end
	end

	def update
		@user = User.find(params[:id])
		@user.role = params[:user][:role].to_i
		@user.save
		redirect_to user_path(@user)
	end
end
class UsersController < ApplicationController
	def show
		if current_user == User.find_by(id: params[:id])
		  @user = current_user
		else
		  flash[:alert] = "You do not have the authorization to view this page."
		  redirect_to root_path
		end
	end
end
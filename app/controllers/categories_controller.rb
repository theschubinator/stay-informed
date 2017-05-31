class CategoriesController < ApplicationController
	def show
		@category = Category.find(params[:id])
		@tasks = Category.user_tasks(current_user, @category)
	end

end

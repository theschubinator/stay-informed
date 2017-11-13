class CategoriesController < ApplicationController
	def show
		@category = Category.find(params[:id])
		@tasks = Category.user_tasks(current_user, @category)

		respond_to do |f|
			f.html {render :show}
			f.json {render json: @tasks}
		end
	end

end

module TasksHelper
	def list_task_categories(task)
		task.categories.collect { |category| category.name }.join(", ")
	end
end

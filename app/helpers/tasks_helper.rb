module TasksHelper
	def list_task_categories(task)
		task.categories.collect { |category| category.name }.join(", ")
	end

	def overdue_tasks_message(user)
		"#{Task.overdue_tasks(user.tasks).count} overdue #{'task'.pluralize(Task.overdue_tasks(user.tasks).count)}"
	end

	def overdue_tasks_count(user)
		Task.overdue_tasks(user.tasks).count
	end
	
end

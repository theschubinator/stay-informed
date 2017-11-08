$(function () {
		const id = $("#username").data("id")
		$.get(`/users/${id}/tasks.json`, function(data) {
			data.forEach(function(task) {
				const categories = []
				task.categories.forEach(function(category) {
    			categories.push(category.name)
				})

				const html = 
				`<li>
					<button id=complete_task_${task.id}>Complete Task</button><br>
					<b>Name:</b> ${task["name"]}<br>
					<b>Categories:</b> ${categories.join(", ")}<br>
					<b>Description:</b> ${task.description}<br>
					<b>Added by:</b> ${task.user.email}<br>
					<b>Due Date:</b> ${new Date(task.due_date)}
				</li><br>`

				if (task.complete) {
					$(".completed_tasks ol").append(html)
				} else {
					$(".current_tasks ol").append(html)
				}

			})
		})
	})

$(function () {
	attachListeners()
})

function attachListeners() {
	loadTasks()
}

function loadTasks() {
	const id = $("#username").data("id")
	$.get(`/users/${id}/tasks.json`, function(data) {
		data.forEach(function(task) {
			const categories = []
			task.categories.forEach(function(category) {
  			categories.push(category.name)
			})

			const html = 
			`<li id=task_${task.id}>
				<button class=complete_task data-id=${task.id}>Complete Task</button><br>
				<b>Name:</b> ${task["name"]}<br>
				<b>Categories:</b> ${categories.join(", ")}<br>
				<b>Description:</b> ${task.description}<br>
				<b>Added by:</b> ${task.user.email}<br>
				<b>Due Date:</b> ${new Date(task.due_date)}
			</li><br id=br_${task.id}>`

			if (task.complete) {
				$(".completed_tasks ol").append(html)
			} else {
				$(".current_tasks ol").append(html)
			}
		})
		completeTask(id)
	})
}

function getTask(user_id, task_id) {
	$.get(`${user_id}/tasks/${task_id}.json`, function(data) {
		return data
	})
}

//How can I reset a completed task back without refreshing the page???
function completeTask(user_id) {
	$(".complete_task").on("click", function(event) {
		const task_id = this.attributes[1].value

		$.get(`${user_id}/tasks/${task_id}.json`, function(data) {
			let task = data

			if (task.complete) {
				task.complete = false
			} else {
				task.complete = true
			}
			
			$.ajax({
				url: `${user_id}/tasks/${task_id}`,
				data: JSON.stringify(task),
				type: "PATCH",
				contentType: "application/json; charset=utf-8",
				dataType: "json"
			}).success(function(task) {
				moveTaskLocation(task)
			})
		})	
	})
}

function moveTaskLocation(task) {
	const id = task.id
	const html = `<li id=task_${task.id}>${$(`#task_${id}`).html()}</li><br id=${id}>`
	
	
	$(`#task_${id}`).remove()
	$(`#br_${id}`).remove()

	if (task.complete) {
		$(".completed_tasks ol").append(html)
	} else {
		$(".current_tasks ol").append(html)
	}
}
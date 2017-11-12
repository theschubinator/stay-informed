$(function () {
	loadMoreTasks()
	completeTask()
	renderNewTaskForm()
	deleteTask()
})

//Objects
function Task(data) {
	this.id = data.id
	this.name = data.name
	this.description = data.description
	this.complete = data.complete
	this.due_date = data.due_date
	this.categories = data.categories
	this.user = data.user
}

Task.prototype.due = function() {
	let date = new Date ($(this)[0].due_date)
	const days = ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."]
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

	const day = days[date.getDay()]
	const dayOfMonth = date.getDate()
	const month = months[date.getMonth()]
	const year = date.getFullYear()
	const hours = date.getHours()
	const minutes = date.getMinutes()

	let formattedMinutes = ""
	let totalTime = ""

	if(minutes < 10) {
		formattedMinutes = `0${minutes}`
	} else {
		formattedMinutes = `${minutes}`
	}

	if(hours > 12) {
		totalTime = `${hours - 12}:${formattedMinutes}PM`
	} else {
		totalTime = `${hours}:${formattedMinutes}AM`
	}

	return `${day} ${month}, ${dayOfMonth} ${year} at ${totalTime}`
}

function loadMoreTasks() {
	$("#view_all_tasks").on("click", function(e) {
		e.preventDefault()

		$.get(`/users/1/tasks.json`, function (tasks) {
			let moreTasks = []

			let sorted_tasks = tasks.sort(function(a,b) {
				return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
			})

			for (let i=0; i < sorted_tasks.length; i++) {
				if(i > 2) {
					let taskObj = new Task(sorted_tasks[i])
					taskObj.due()
					moreTasks.push(taskObj)
				}
			}

			moreTasks.forEach(function(task) {
				function listCategories() {
					let categories = []
					task.categories.forEach(function (category) {
						categories.push(category.name)
					})
					return categories.join(", ")
				}

				taskHTML = `<li>`
				taskHTML += `<b>Name:</b> ${task.name}<br>`
				taskHTML += `<b>Categories:</b> ${listCategories()}<br>`
				taskHTML += `<b>Description:</b> ${task.description}<br>`
				taskHTML += `<b>Added By:</b> ${task.user.email}<br>`
				taskHTML += `<b>Due Date:</b> ${task.due()}<br>`
				taskHTML += `<button type="button" class="btn btn-success btn-sm">Complete</button> `
				taskHTML += `<button type="button" class="btn btn-primary btn-sm">View</button>`
				taskHTML += ` <button type="button" class="btn btn-danger btn-sm">Delete</button><br><br>`
				taskHTML += `</li>`

				$("#list_tasks").append(taskHTML)
			})
		})
		$("#view_all_tasks").remove()
	})	
}

function completeTask() {
	$(".btn-success").on("click", function(e) {
		const user_id = $(this).data("user_id")
		const task_id = $(this).data("task_id")

		$.get(`/users/${user_id}/tasks/${task_id}.json`, function(taskData) {
			const task = new Task(taskData)
			task.complete ? task.complete = false : task.complete = true
			$.ajax({
				type: "PATCH",
				url: `/users/${user_id}/tasks/${task_id}`,
				data: JSON.stringify(task),
				contentType: "application/json",
				dataType: "json",
			})
		})	
	})
}

function renderNewTaskForm() {
	$("#new_task_btn").on("click", function(e) {
		let user_id = 1
		$.get(`tasks/new`, function(html) {
			$("#render_new_form").html(html)
			saveNewTask()
		})
		$("#new_task_btn").remove()
	})
}

function saveNewTask() {
	$("form").on("submit", function(e) {
		e.preventDefault()
		let taskData = $(this).serialize()
		$.post(`tasks/`, taskData).done(function(taskData) {
			$.get(`tasks/${taskData.id}.json`, function(taskData) {
				let task = new Task(taskData)
				function listCategories() {
					let categories = []
					task.categories.forEach(function (category) {
						categories.push(category.name)
					})
					return categories.join(", ")
				}
				debugger
				taskHTML =	"<p id='task_submission_alert'>Task Created Successfully!</p>"
				taskHTML += "<h3> Newly Created Task</h3>"
				taskHTML += `<b>Name:</b> ${task.name}<br>`
				taskHTML += `<b>Categories:</b> ${listCategories()}<br>`
				taskHTML += `<b>Description:</b> ${task.description}<br>`
				taskHTML += `<b>Added By:</b> ${task.user.email}<br>`
				taskHTML += `<b>Due Date:</b> ${task.due()}<br>`

				$("#render_new_form").html(taskHTML)
			})
		})
	})
}

function deleteTask() {
	$(".btn-danger").on("click", function(e) {
		const user_id = $(this).data("user_id")
		const task_id = $(this).data("task_id")

		$.get(`/users/${user_id}/tasks/${task_id}.json`, function(taskData) {
			const task = new Task(taskData)
			task.complete ? task.complete = false : task.complete = true
			$.ajax({
				type: "DELETE",
				url: `/users/${user_id}/tasks/${task_id}`,
			})
		})	
	})
}
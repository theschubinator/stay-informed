$(function () {
	loadMoreTasks()
	completeTask()
	renderNewTaskForm()
	deleteTask()
	viewTask()
	updateTask()
	viewByCategory()
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
// ******************** //

function loadMoreTasks() {
	$("#view_all_tasks").on("click", function(e) {
		e.preventDefault()
		$.get(`/users/1/tasks.json`, function (tasksJSON) {
			loadAllTasksAfterThree(tasksJSON)
		})
		completeTask() // does not work!!!
	})	
}

function loadAllTasksAfterThree(tasksJSON) {
	let tasks = []
	for (let i=0; i < tasksJSON.length; i++) {
		if(i > 2) {
			let taskObj = new Task(tasksJSON[i])
			tasks.push(taskObj)
		}
	}
	$("#list_tasks").append(listTasks(tasks))
	$("#view_all_tasks").remove()
}

function viewByCategory() {
	$("#task_search a").on("click", function(e) {
		e.preventDefault()
		const categoryName = $(this).html()
		$.get(`${this.href}.json`, function(TasksData) {
			let tasks = []
			TasksData.forEach(function(taskData) {
				let task = new Task(taskData)
				tasks.push(task)
			})
			$("#task_header").html(categoryName)
			$("#list_tasks").empty()
			$("#list_tasks").append(listTasks(tasks))
		})
	})
}

function viewTask() {
	$(".view_btn").on("click", function(e) {
		const task_id = $(this).data("task_id")
		$.get(`tasks/${task_id}.json`, function(taskData) {
			let task = new Task(taskData)
			taskHTML = listTasks(task)
			$("#list_tasks").html(taskHTML)
			$("#task_header").html(task.name)
			$("#view_all_tasks").remove()
		})
	})
}

function listTasks(tasks) {	
	let taskHTML = "" 
	if (tasks.length) {
		tasks.forEach(function(task) {
			taskHTML = `<li>`
			taskHTML += `<b>Name:</b> ${task.name}<br>`
			taskHTML += `<b>Due Date:</b> ${task.due()}<br>`
			taskHTML += `<button type="button" class="btn btn-success btn-sm">Complete</button> `
			taskHTML += `<button type="button" class="btn btn-primary btn-sm">View</button>`
			taskHTML += ` <button type="button" class="btn btn-danger btn-sm">Delete</button><br><br>`
			taskHTML += `</li>`
		})
	} else {
			taskHTML = `<b>Categories:</b> ${listCategoryNames(tasks)}<br>`
			taskHTML += `<b>Description:</b> ${tasks.description}<br>`
			taskHTML += `<b>Added By:</b> ${tasks.user.email}<br>`
			taskHTML += `<b>Due Date:</b> ${tasks.due()}<br>`
			taskHTML += `<button type="button" class="btn btn-success btn-sm">Complete</button> `
			taskHTML += `<button type="button" class="btn btn-primary btn-sm update_btn">Update</button>`
			taskHTML += `<button type="button" class="btn btn-danger btn-sm">Delete</button>`
			//Complete, Update, and Delete do not work on viewTasks()
		}
	return taskHTML
}

function renderNewTaskForm() {
	$("#new_task_btn").on("click", function(e) {
		let user_id = 1
		$.get(`tasks/new`, function(html) {
			$("#render_new_form").html(html)
			saveNewTask()
		})
		$("#new_task_btn").remove()
		// renderNewCategoryField() // Form has not been rendered to HTML yet.
	})
}

// How can I add this function into my renderNewTaskForm()????

// function renderNewCategoryField() {
// 	$(".render_new_category_textarea").on("click", function(e) {
// 		e.preventDefault()
// 		debugger
// 	})
// }

function saveNewTask() {
	$("form").on("submit", function(e) {
		e.preventDefault()
		let taskData = $(this).serialize()
		$.post(`tasks/`, taskData).done(function(taskData) {
			$.get(`tasks/${taskData.id}.json`, function(taskData) {
				let task = new Task(taskData)

				taskHTML =	"<p id='task_submission_alert'>Task Created Successfully!</p>"
				taskHTML += "<h3> Newly Created Task</h3>"
				taskHTML += `<b>Name:</b> ${task.name}<br>`
				taskHTML += `<b>Categories:</b> ${listCategoryNames(task)}<br>`
				taskHTML += `<b>Description:</b> ${task.description}<br>`
				taskHTML += `<b>Added By:</b> ${task.user.email}<br>`
				taskHTML += `<b>Due Date:</b> ${task.due()}<br>`

				$("#render_new_form").html(taskHTML)
			})
		})
	})
}

function listCategoryNames(task) {
	let categories = []
	task.categories.forEach(function (category) {
		categories.push(category.name)
	})
	return categories.join(", ")
}

function completeTask() {
	$(".complete_btn").on("click", function(e) {
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

function deleteTask() {
	$(".delete_btn").on("click", function(e) {
		const task_id = $(this).data("task_id")
		$.get(`tasks/${task_id}.json`, function(taskData) {
			$.ajax({type: "DELETE", url: `tasks/${task_id}`})
		})	
	})
}

function updateTask() {
	$(".update_btn").on("click", function(e) {
		debugger
	})
}
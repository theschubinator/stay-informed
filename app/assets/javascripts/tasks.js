$(function () {
	loadMoreTasks()
	completeTask()
	renderNewTaskForm()
	deleteTask()
	viewTask()
	editTask()
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
	const time = formatTime(date)
	return `${day} ${month}, ${dayOfMonth} ${year} at ${time}`
}

function formatTime(date) {
	const hours = date.getHours()
	const minutes = date.getMinutes()
	let formattedMinutes = ""
	let totalTime = ""
	minutes < 10 ? formattedMinutes = `0${minutes}` : formattedMinutes = `${minutes}`
	hours > 12 ? totalTime = `${hours - 12}:${formattedMinutes}PM` : totalTime = `${hours}:${formattedMinutes}AM`
	return totalTime
}

// ******************** //

function loadMoreTasks() {
	$("#view_all_tasks").on("click", function(e) {
		e.preventDefault()
		$.get(`tasks.json`, function (tasksJSON) {
			loadAllTasksAfterThree(tasksJSON)
		}).done(function(e) {
				completeTask()
				deleteTask()
				editTask()
				viewTask()
			})
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
	listTasks(tasks)
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
		}).done(function(){
				completeTask()
				deleteTask()
				editTask()
				viewTask()
		})
	})
}

function listTasks(tasks) {	
	let taskHTML = "" 
	if (tasks.length && tasks.length > 0) {
		tasks.forEach(function(task) {
			taskHTML = `<li>`
			taskHTML += `<b>Name:</b> ${task.name}<br>`
			taskHTML += `<b>Due Date:</b> ${task.due()}<br>`
			taskHTML += `<button type="button" class="btn btn-success btn-sm complete_btn" data-task_id=${task.id}>Complete</button> `
			taskHTML += `<button type="button" class="btn btn-primary btn-sm view_btn" data-task_id=${task.id}>View</button>`
			taskHTML += ` <button type="button" class="btn btn-danger btn-sm delete_btn" data-task_id=${task.id}">Delete</button><br><br>`
			taskHTML += `</li>`
			$("#list_tasks").append(taskHTML)
		})
	} else if (tasks.length === 0) {
		$("#list_tasks").append("You are already viewing all current tasks.")
	} else {
			taskHTML = `<b>Categories:</b> ${listCategoryNames(tasks)}<br>`
			taskHTML += `<b>Description:</b> ${tasks.description}<br>`
			taskHTML += `<b>Added By:</b> ${tasks.user.email}<br>`
			taskHTML += `<b>Due Date:</b> ${tasks.due()}<br>`
			taskHTML += `<button type="button" class="btn btn-success btn-sm complete_btn" data-task_id=${tasks.id}>Complete</button> `
			taskHTML += `<button type="button" class="btn btn-primary btn-sm update_btn" data-task_id=${tasks.id}>Edit</button>`
			taskHTML += `<button type="button" class="btn btn-danger btn-sm delete_btn" data-task_id=${tasks.id}>Delete</button>`
			//Complete, Update, and Delete do not work on viewTasks()
		}
	return taskHTML
}

function renderNewTaskForm() {
	$("#new_task_btn").on("click", function(e) {
		$.get(`tasks/new`, function(html) {
			$("#render_new_form").html(html)
			saveNewTask()
		})
		$("#new_task_btn").remove()
	})
}

function renderNewCategoryField() {
	let i = 1
	renderForm()
	function renderForm() {
		if ($(`#${i}`).length === 0) {
			let categoryForm = `<p> New Category: <input size=25 type=text name=task[categories_attributes[${i}][name] id=task_categories_attributes_[${i}]_name><input type="hidden" id=${i}></p>`
			$("#rendered_new_category_form").append(categoryForm)
		} else if ($(`#${i}`).length === 1) {
			i++
			renderForm()
		}	
	}
}

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
				taskHTML += `<button type="button" class="btn btn-primary btn-sm update_btn" id=edit_new data-task_id=${task.id}" onclick="edit_new_task()">Edit</button>`
				taskHTML += `<button type="button" class="btn btn-danger btn-sm delete_btn" id=delete_new data-task_id=${task.id} onclick="delete_new_task()">Delete</button>`

				$("#render_new_form").html(taskHTML)
			})
		})
	})
}

function edit_new_task() {
	alert("edit was clicked")
}

function delete_new_task() {
	const task_id = $("#delete_new").data("task_id")
		$.get(`tasks/${task_id}.json`, function(taskData) {
			$.ajax({type: "DELETE", url: `tasks/${task_id}`})
		}).done(function() {$("#render_new_form").html("Task Successfully Deleted")})
}

function listCategoryNames(task) {
	let categories = []
	task.categories.forEach(function (category) {
		categories.push(category.name)
	})
	return categories.join(", ")
}

function viewTask() {
	$(".view_btn").on("click", function(e) {
		const task_id = $(this).data("task_id")
		$.get(`tasks/${task_id}.json`, function(taskData) {
			let task = new Task(taskData)
			let taskHTML = listTasks(task)
			$("#view_all_tasks").remove()
			$("#list_tasks").html(taskHTML)
			$("#task_header").html(task.name)
			
		}).done(function() {
			editTask()
			completeTask()
			deleteTask()
		})
	})
}

function completeTask() {
	$(".complete_btn").on("click", function(e) {
		const task_id = $(this).data("task_id")

		$.get(`tasks/${task_id}.json`, function(taskData) {
			const task = new Task(taskData)
			task.complete ? task.complete = false : task.complete = true
			$.ajax({
				type: "PATCH",
				url: `tasks/${task_id}`,
				data: JSON.stringify(task),
				contentType: "application/json",
				dataType: "json",
			}).done(function() {location.reload()})
		})	
	})
}

function deleteTask() {
	$(".delete_btn").on("click", function(e) {
		const task_id = $(this).data("task_id")
		$.get(`tasks/${task_id}.json`, function(taskData) {
			$.ajax({type: "DELETE", url: `tasks/${task_id}`})
		}).done(function() {location.reload()})
	})
}

function editTask() {
	$(".update_btn").on("click", function(e) {
		const task_id = $(this).data("task_id")
		$.get(`tasks/${task_id}/edit`, function(html) {
			$("#render_new_form").html(html)
			saveNewTask()
		})
		$("#new_task_btn").remove()
	})
}
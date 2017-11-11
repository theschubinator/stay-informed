$(function () {
	loadMoreTasks()
})

//Objects
function Task(data) {
	this.id = data.id
	this.name = data.name
	this.description = data.description
	this.complete = data.complete
	this.due_date = data.due_date
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
				taskHTML = `<li>`
				taskHTML += `<button type="button" class="btn btn-primary btn-sm">Complete</button> `
				taskHTML += `<b>Name:</b> ${task.name}<br>`
				taskHTML += `<b>Categories:</b> ${task.categories}<br>`
				taskHTML += `<b>Description:</b> ${task.description}<br>`
				taskHTML += `<b>Added By:</b> Name Goes Here<br>`
				taskHTML += `<b>Due Date:</b> ${task.due()}<br><br>`
				taskHTML += `</li>`

				$("#rendered_tasks").append(taskHTML)
			})
		})
	})	
}


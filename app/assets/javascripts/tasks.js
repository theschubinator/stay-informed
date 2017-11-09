$(function () {
	attachListeners()
})

function attachListeners() {
	loadTasks()
}

function loadTasks() {
	$("#current_tasks").html("<h3>Current Tasks</h3><ol></ol>")
	$("#completed_tasks").html("<h3>Completed Tasks</h3><ol></ol>")

	const id = $("#username").data("id")

	$.get(`/users/${id}/tasks.json`, function(data) {	
		findCategories(data)
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
				<b>Due Date:</b> ${formateDate(task.due_date)}
			</li><br id=br_${task.id}>`

			if (task.complete) {
				$("#completed_tasks ol").append(html)
			} else {
				$("#current_tasks ol").append(html)
			}
		})
		completeTask(id)
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

//Moves a completed task back and forth betweeen current and completed tasks.
function moveTaskLocation(task) {
	const id = task.id
	const html = `<li id=task_${task.id}>${$(`#task_${id}`).html()}</li><br id=${id}>`
	
	
	$(`#task_${id}`).remove()
	$(`#br_${id}`).remove()

	if (task.complete) {
		$("#completed_tasks ol").append(html)
	} else {
		$("#current_tasks ol").append(html)
	}
}

function formateDate(date) {
	let d = new Date(date)

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octoboer", "November", "December"]
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

	const dayofmonth = d.getDate()
	const month = months[d.getMonth()]
	const day = days[d.getDay()]
	const year = d.getFullYear()
	const time = formateTime(d.getHours(), d.getMinutes())

	const formattedDate = `${day}, ${month}, ${dayofmonth} ${year} at ${time}`
	return formattedDate
}


function formateTime(hours, minutes) {
	let minute = ""
	let time = ""

	if (minutes < 10) {
		minute = `0${minutes}`
	} else {
		minute = minutes
	}

	if (hours > 12) {
		const hour = hours - 12
		time = `${hour}:${minute} P.M.`
	} else {
		time = `${hour}:${minute} A.M.`
	}
	return time
}

function findCategories(data) {
	const user_id = data[0].user
	allCategories = []
	data.forEach(function(task) {
		task.categories.forEach(function(category){

			if (allCategories.length === 0) {
				allCategories.push(category)
			}

			let found = false
			for(let i = 0; i < allCategories.length; i++) {
		    if (allCategories[i].name === category.name) {
		    	found = true
		    }
			}

			if (!found) {
				allCategories.push(category)
			}
		})
	})
	loadCategories(allCategories, user_id)
}

function loadCategories(categories, user_id) {
	let html = "View Tasks By Category: | "
	categories.forEach(function(category) {
		html += ` <a href="${user_id}/categories/${category.id}">${category.name}</a> |`
	})
	$("#categories").html(html)
}
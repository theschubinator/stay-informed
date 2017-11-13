Issues::

1) JS doesn't work after clicking a link without doing a complete page refresh.
	a) Clicking on the Home | User Profile | Log Out links disengages all JS code until I do a manual page refresh to reload it.
	b) Viewing tasks by the category links does not allow the complete, view, or delete buttons to work. 
	c) Click on the link "view all current tasks", but then the complete, view, and delete buttons do not work. 
			* tried passing the completeTask() into this function after the page loads, but no go! *

2) Cannot access JS functionality for items not already rendered on screen when page is loaded. 
	a) When a new form is rendered, I want a user to be able to click a link that adds a new category form to the form instead of having 2 seperate "static" textareas provided already. *see renderNewCategoryField() in tasks.js*

3) The time in the Form is not lining up with the time that actually is being saved. The Form shows the time 7 hours ahead of the real time. 



Questions:
1) How does AJAX request know about the user_id automatically?
2) Is there a way to link different JS files so you could use a function in task.js that is located in categories.js for example?
3) Is there a way to write a <script> in the HTML that renders the HTML of the JS Code instead of hard coding it as a string within the actual JS code?
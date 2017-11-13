Issues::

1) JS doesn't work after clicking a link without doing a complete page refresh.
	a) Clicking on the Home | User Profile | Log Out links disengages all JS code until I do a manual page refresh to reload it.
	b) Viewing tasks by the category links does not allow the complete, view, or delete buttons to work. 
	c) Click on the link "view all current tasks", but then the complete, view, and delete buttons do not work.

2) Cannot access JS functionality for items not already rendered on screen when page is loaded. 
	a) When a new form is rendered, I want a user to be able to click a link that adds a new category form to the form instead of having 2 seperate "static" textareas provided already. *see renderNewCategoryField() in tasks.js*



Questions:
1) How does AJAX request know about the user_id automatically?
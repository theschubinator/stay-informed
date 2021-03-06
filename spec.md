# Specifications for the Rails with jQuery Assessment

Specs:
- [X] Use jQuery for implementing new requirements
- [X] Include a show resource rendered using jQuery and an Active Model Serialization JSON backend.
- [X] Include an index resource rendered using jQuery and an Active Model Serialization JSON backend.
- [X] Include at least one has_many relationship in information rendered via JSON and appended to the DOM.
- [X] Use your Rails API and a form to create a resource and render the response without a page refresh.
- [X] Translate JSON responses into js model objects.
- [X] At least one of the js model objects must have at least one method added by your code to the prototype.

Confirm
- [X] You have a large number of small Git commits
- [X] Your commit messages are meaningful
- [X] You made the changes in a commit that relate to the commit message
- [X] You don't include changes in a commit that aren't related to the commit message


# Specifications for the Rails Assessment

Specs:
- [X] Using Ruby on Rails for the project
- [X] Include at least one has_many relationship (x has_many y e.g. User has_many Recipes) 
- [X] Include at least one belongs_to relationship (x belongs_to y e.g. Post belongs_to User)
- [X] Include at least one has_many through relationship (x has_many y through z e.g. Recipe has_many Items through Ingredients)
- [X] The "through" part of the has_many through includes at least one user submittable attribute (attribute_name e.g. ingredients.quantity)
- [X] Include reasonable validations for simple model objects (list of model objects with validations e.g. User, Recipe, Ingredient, Item)
- [X] Include a class level ActiveRecord scope method (model object & class method name and URL to see the working feature e.g. User.most_recipes URL: /users/most_recipes)
- [X] Include a nested form writing to an associated model using a custom attribute writer (form URL, model name e.g. /recipe/new, Item)
- [X] Include signup (how e.g. Devise)
- [X] Include login (how e.g. Devise)
- [X] Include logout (how e.g. Devise)
- [X] Include third party signup/login (how e.g. Devise/OmniAuth)
- [X] Include nested resource show or index (URL e.g. users/2/recipes)
- [X] Include nested resource "new" form (URL e.g. recipes/1/ingredients)
- [X] Include form display of validation errors (form URL e.g. /recipes/new)

Confirm:
- [X] The application is pretty DRY
- [X] Limited logic in controllers
- [X] Views use helper methods if appropriate
- [X] Views use partials if appropriate
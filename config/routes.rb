Rails.application.routes.draw do
  resources :categories
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  resources :users do
    resources :tasks
    get "/completed_tasks", to: "tasks#completed_tasks", as: "completed_tasks"
  end

  # /admin/:admin_id/tasks/:id
  get "/admin/:user_id/users", to: "admin#users", as: "admin_users"
  get "admin/:user_id/tasks/new", to: "admin#new_task", as: "new_admin_task"
  post "admin/:user_id/tasks", to: "admin#create_task", as: "admin_task"
  
  root "static#index"
end

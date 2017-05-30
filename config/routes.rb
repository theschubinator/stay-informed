Rails.application.routes.draw do
  resources :categories
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  resources :users do
    resources :tasks
  end
  
  root "static#index"
end

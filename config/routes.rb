Rails.application.routes.draw do
  resources :user_code_reviews
  resources :code_reviews
  resources :topics
  resources :code_topics
  resources :codes
  resources :reviews
  resources :user_reviews
  # resources :users , except: [:new, :edit]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

    # route to test your configuration
    get '/hello', to: 'application#hello_world'
    get '/users', to: 'users#show_all'

    # SignUp Form
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
  
    post "/signup", to: "users#create"
    get "/me", to: "users#show"

    get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end

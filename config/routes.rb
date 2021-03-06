Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  get '*path', to: 'pages#index', constraints: ->(request){ request.format.html? }
  resources :batches
  resources :tasks
  root to: "pages#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

end

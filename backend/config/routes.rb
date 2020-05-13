Rails.application.routes.draw do
  resources :vote_tokens, defaults: {format: :json}
  resources :entries, defaults: {format: :json}
  resources :jams, defaults: {format: :json}
  resources :users, defaults: {format: :json}
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

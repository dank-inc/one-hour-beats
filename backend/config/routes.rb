Rails.application.routes.draw do
  post 'login', to: 'users#login'

  resources :vote_tokens, defaults: {format: :json}
  resources :entries, defaults: {format: :json}
  resources :jams, defaults: {format: :json}
  resources :users, defaults: {format: :json}

  get 'jams/:id/entries', to: 'jams#entries'
  
  post 'jams/:id/start', to: 'jams#start'
  post 'jams/:id/stop', to: 'jams#stop'
  
  post 'jams/:id/upload', to: 'jams#upload'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

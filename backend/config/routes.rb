Rails.application.routes.draw do
  resources :chats
  post 'login', to: 'authentication#login'

  resources :vote_tokens, defaults: {format: :json}
  resources :entries, defaults: {format: :json}
  resources :jams, defaults: {format: :json}
  resources :users, defaults: {format: :json}

  get 'jams/:id/entries', to: 'jams#entries'
  get 'jams/:id/chat', to: 'chats#jam_chat'
  get 'check_invite/:token', to: 'users#check_invite'
  


  post 'entries/:id/vote', to: 'entries#vote'

  post 'jams/:id/start', to: 'jams#start'
  post 'jams/:id/stop', to: 'jams#stop'
  
  post 'jams/:id/upload', to: 'jams#upload'
  post 'jams/:id/chat', to: 'chats#create'

  post 'invite', to: 'users#invite'
  post 'accept_invite/:token', to: 'users#accept_invite'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

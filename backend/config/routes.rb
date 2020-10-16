Rails.application.routes.draw do
  defaults format: :json do 
    resources :chats
    post 'login', to: 'authentication#login'
  
    resources :vote_tokens
    resources :entries 

    resources :jams
    resources :users
  
    get 'jams/:jam_id/entries', to: 'entries#index'
    
    # CHAT
    get 'jams/:id/chat', to: 'chats#jam_chat'
    post 'jams/:id/chat', to: 'chats#create'
    
    get 'check_invite/:token', to: 'users#check_invite'
  
    post 'entries/:id/vote', to: 'entries#vote'
  
    post 'jams/:id/start', to: 'jams#start'
    post 'jams/:id/stop', to: 'jams#stop'
    
    post 'jams/:id/upload', to: 'jams#upload'
  
    post 'invite', to: 'users#invite'
    post 'accept_invite/:token', to: 'users#accept_invite'
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  end
end

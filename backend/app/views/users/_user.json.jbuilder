json.extract! user, :id, :username, :name, :email, :password, :thumbs, :wins, :created_at, :updated_at
json.url user_url(user, format: :json)

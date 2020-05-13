json.extract! vote_token, :id, :user_id, :jam_id, :entry_id, :created_at, :updated_at
json.url vote_token_url(vote_token, format: :json)

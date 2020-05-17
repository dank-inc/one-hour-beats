json.extract! entry, :id, :title, :link, :user_id, :jam_id, :created_at, :updated_at
json.url entry_url(entry, format: :json)

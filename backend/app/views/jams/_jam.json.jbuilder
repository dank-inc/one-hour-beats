json.id             jam.id
json.name           jam.name
json.description    jam.description
json.time_limit     jam.time_limit
json.user_id        jam.user_id
json.started_at     jam.started_at
json.created_at     jam.created_at
json.updated_at     jam.updated_at
json.entries jam.entries, partial: 'entries/entry', as: :entry
  

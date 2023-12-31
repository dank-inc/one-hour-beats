class Entry < ApplicationRecord
  
  belongs_to :jam
  belongs_to :user

  has_many :vote_tokens
  # TODO: add unique user_id in context of jam_id


  # View
  def artist_name
    self.user.username
  end

  def votes
    self.vote_tokens.pluck(:user_id)
  end
end

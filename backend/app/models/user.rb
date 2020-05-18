class User < ApplicationRecord
  has_many  :jams
  has_many  :entries
  has_many  :vote_tokens
  has_many  :chats
  
  def thumbsup
    update(thumbs: thumbs + 1)
  end
  
  # TODO: write an instance method that increments the users' wins
end

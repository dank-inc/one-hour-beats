class Jam < ApplicationRecord
  has_many :entries, dependent: :delete_all
  has_many :chats, dependent: :delete_all

  belongs_to :user

  has_many :vote_tokens, dependent: :delete_all

  def start!
    self.update! started_at: Time.now
  end

  def stop!
    self.update! started_at: nil
  end
end


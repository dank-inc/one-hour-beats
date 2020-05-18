class Jam < ApplicationRecord
  has_many :entries
  has_many :chats

  belongs_to :user

  def start!
    self.update! started_at: Time.now
  end

  def stop!
    self.update! started_at: nil
  end
end


class Jam < ApplicationRecord
  has_many :entries, dependent: :delete_all
  has_many :chats, dependent: :delete_all

  belongs_to :user

  has_many :vote_tokens, dependent: :delete_all

  # TODO: add start_at
  # TODO: if jam finished w/ no entries, archive jam
  # TODO: users opt-into jam

  # TODO: add time_limit to scope
  scope :started, -> { where('started_at < now()') } 

  def started?
    @jam.started_at
  end

  def ended
    started_at && Time.now > (started_at + time_limit.minutes)
  end

  def start!
    self.update! started_at: Time.now
  end

  def stop!
    self.update! started_at: nil
  end
end


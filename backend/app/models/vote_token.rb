class VoteToken < ApplicationRecord
  belongs_to :user
  belongs_to :jam

  validates :jam, presence: true
  validates :user, presence: true

  def entry
    Entry.find_by(id: self.entry_id)
  end
end

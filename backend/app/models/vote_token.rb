class VoteToken < ApplicationRecord
  belongs_to :user
  belongs_to :jam

  validates :jam, presence: true
  validates :user, presence: true

  has_one :entry
end

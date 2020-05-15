class VoteToken < ApplicationRecord
  belongs_to :user
  belongs_to :jam
  has_one :entry
end

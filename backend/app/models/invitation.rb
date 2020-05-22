class Invitation < ApplicationRecord
  belongs_to :user, foreign_key: :invited_by

  validates :token, presence: true, uniqueness: true
  
  # we will used claimed_by to determine if token is still valid
end

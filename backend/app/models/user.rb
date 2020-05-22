class User < ApplicationRecord
  has_many  :jams
  has_many  :entries
  has_many  :vote_tokens
  has_many  :chats
  has_many  :invitations, foreign_key: :invited_by
  
  has_secure_password
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, presence: true, uniqueness: true
  validates :password, 
    length: { minimum: 6 },
    if: -> { new_record? || !password.nil? }

  def thumbsup
    update(thumbs: thumbs + 1)
  end

  def active_invitation
    Invitation.find_by(
      invited_by: self.id,
      claimed_by: nil,
    )
  end



  # TODO: write an instance method that increments the users' wins
end

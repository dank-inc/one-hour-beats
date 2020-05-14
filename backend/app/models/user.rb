class User < ApplicationRecord
  def thumbsup
    update(thumbs: thumbs + 1)
  end
  
  # TODO: write an instance method that increments the users' wins
end

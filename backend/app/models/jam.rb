class Jam < ApplicationRecord
  def start!
    self.update! started_at: Time.now
  end

  def stop!
    self.update! started_at: nil
  end
end

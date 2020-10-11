class JamsChannel < ApplicationCable::Channel
  def subscribed
    stream_for 'global'
  end

  def unsubscribed

  end
end
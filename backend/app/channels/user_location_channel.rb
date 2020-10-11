class UserLocationChannel < ApplicationCable::Channel
  def subscribed
    stream_for 'global'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

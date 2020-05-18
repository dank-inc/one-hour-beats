class AppContextChannel < ApplicationCable::Channel
  def subscribed
    # for global ass updates
    stream_for 'global'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

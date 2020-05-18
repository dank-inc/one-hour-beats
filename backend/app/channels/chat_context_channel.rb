class ChatContextChannel < ApplicationCable::Channel
  def subscribed
    @jam = Jam.find(params[:jam_id])
    stream_for @jam
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

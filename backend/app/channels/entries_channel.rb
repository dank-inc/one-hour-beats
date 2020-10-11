class EntriesChannel < ApplicationCable::Channel
  def subscribed
    @jam = Jam.find params[:jam_id]
    stream_for @jam
  end

  def unsubscribed

  end
end
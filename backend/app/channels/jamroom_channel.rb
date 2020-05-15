class JamroomChannel < ApplicationCable::Channel
  def subscribed
    jam = Jam.find params[:id]
    stream_for jam
  end

  def unsubscribed 
    puts ">>> SOMEBODY UNSUBSCRIBED #{params}"
    # Any cleanup needed when channel is unsubscribed
  end
end

class JamroomChannel < ApplicationCable::Channel
  @@jam_index = {}
  
  def subscribed
    puts ">>> #{params[:user_id]} subscribing to #{params[:jam_id]}"
    
    @jam = Jam.find params[:jam_id]
    @user = User.find params[:user_id]

    if @@jam_index[@jam.id] 
      @@jam_index[@jam.id].append @user.username
    else 
      @@jam_index[@jam.id] = [@user.username]
    end
     
    UserLocationChannel.broadcast_to :global, @@jam_index

    puts ">>> The #{@jam.id} room now contains #{@@jam_index[@jam.id]}"
    stream_for @jam
  end

  def unsubscribed 
    return unless @user
    puts ">>> #{@user.id} UNSUBSCRIBED #{@jam.id}"
    @@jam_index[@jam.id]&.delete @user.username

    UserLocationChannel.broadcast_to :global, @@jam_index

    puts ">>> The #{@jam.id} room now contains #{@@jam_index[@jam.id]}"
  end
end

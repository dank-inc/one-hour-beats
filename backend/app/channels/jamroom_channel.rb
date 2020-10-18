class JamroomChannel < ApplicationCable::Channel
  @@jam_index = {}
  @username

  def subscribed
    puts ">>> #{params[:user_id]} subscribing to #{params[:jam_id]}"
    
    @jam = Jam.find params[:jam_id]
    
    @user = User.find_by_id params[:user_id]
    @username = @user ? @user.username : "guest_#{SecureRandom.hex(4)}"
    
    if @@jam_index[@jam.id] 
      @@jam_index[@jam.id].append @username
    else 
      @@jam_index[@jam.id] = [@username]
    end
     
    UserLocationChannel.broadcast_to :global, @@jam_index

    puts ">>> The #{@jam.id} room now contains #{@@jam_index[@jam.id]}"
    stream_for @jam
  end

  def unsubscribed 
    return unless @username
    puts ">>> #{@username} UNSUBSCRIBED #{@jam.id}"
    @@jam_index[@jam.id]&.delete @username

    UserLocationChannel.broadcast_to :global, @@jam_index

    puts ">>> The #{@jam.id} room now contains #{@@jam_index[@jam.id]}"
  end
end

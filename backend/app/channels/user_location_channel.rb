class UserLocationChannel < ApplicationCable::Channel
  def subscribed
    @user = User.find(params[:user_id])
    stream_for 'global'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

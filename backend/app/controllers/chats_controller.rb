class ChatsController < ApplicationController
  before_action :authorize_request
  before_action :set_chat, only: [:show, :update, :destroy]

  # GET /jams/:id/chats
  def jam_chat
    jam = Jam.find(params[:id])
    @chats = jam.chats
    render json: @chats # :index
  end

  # GET /chats
  def index
    @chats = Chat.all
  end

  # GET /chats/1
  def show
  end

  # POST /chats
  def create
    @chat = Chat.new(chat_params)
    if @chat.save
      ChatContextChannel.broadcast_to @chat.jam, @chat
      head :ok
      # render :show, status: :created, location: @chat
    else
      render json: @chat.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /chats/1
  def update
    if @chat.update(chat_params)
      render :show, status: :ok, location: @chat
    else
      render json: @chat.errors, status: :unprocessable_entity
    end
  end

  # DELETE /chats/1
  def destroy
    @chat.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chat
      @chat = Chat.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def chat_params
      params.require(:chat).permit(:user_id, :jam_id, :message)
    end
end

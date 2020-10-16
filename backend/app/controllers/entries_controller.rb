class EntriesController < ApplicationController
  before_action :authorize_request
  before_action :set_entry, only: [:show, :edit, :update, :destroy]


  # GET /entries
  def index
    if params[:jam_id].present?
      @entries = Entry.where(jam_id: params[:jam_id])
    else 
      @entries = Entry.all
    end
  end

  # GET /entries/:id
  def show
  end

  # POST /entries
  def create
    @entry = Entry.new(entry_params)
    @entry.user_id = @current_user.id
    @entry.id = SecureRandom.uuid

      if @entry.save
        VoteToken.create!(
          user_id: @current_user.id,
          jam_id: @entry.jam_id
        )
    
        # user channel send user with vote_tokens
        EntriesChannel.broadcast_to @entry.jam, true

        user = @current_user.as_json
        user[:vote_tokens] = @current_user.vote_tokens
        
        UserChannel.broadcast_to @current_user, user # for self vote token updates
      else
        render json: @entry.errors, status: :unprocessable_entity
      end
  end

  def vote 
    @entry = Entry.find(params[:id])
    @jam = @entry.jam

    vote_token = VoteToken.find_by!(
      user_id: @current_user.id,
      jam_id: @jam.id
    )
    
    vote_token.update!(
      entry_id: params[:id]
    )

    # TODO: just send the vote token.
    user = @current_user.as_json
    user[:vote_tokens] = @current_user.vote_tokens

    # update votes on jams?
    UserChannel.broadcast_to @current_user, user

    @entry = Entry.find(params[:id])
    EntriesChannel.broadcast_to @entry.jam, true
    head :ok
  end


  # PATCH/PUT /entries/:id
  def update
    render json: @entry.errors, status: :unprocessable_entity unless @entry.update(entry_params)
  end

  # DELETE /entries/:id
  def destroy
    @entry.destroy
      # Add some kind of realtime shit for deleting entries
      head :no_content 
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_entry
      @entry = Entry.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def entry_params
      params.require(:entry).permit(:title, :link, :user_id, :jam_id)
    end
end

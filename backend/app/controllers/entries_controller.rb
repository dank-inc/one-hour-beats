class EntriesController < ApplicationController
  before_action :authorize_request
  before_action :set_entry, only: [:show, :edit, :update, :destroy]

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
    UserContextChannel.broadcast_to @current_user, user

    @entry = Entry.find(params[:id])

    entry = @entry.as_json
    entry[:artist_name] = @entry.user.username
    entry[:votes] = @entry.votes

    JamroomChannel.broadcast_to @entry.jam, { entry: entry }
    head :ok
  end

  # GET /entries
  def index
    @entries = Entry.all
  end

  # GET /entries/1
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
        entry = @entry.as_json
        entry[:artist_name] = @entry.user.username
        entry[:votes] = @entry.votes
        
        JamroomChannel.broadcast_to @entry.jam, { entry: entry }
        
        user = @current_user.as_json
        user[:vote_tokens] = @current_user.vote_tokens
        
        UserContextChannel.broadcast_to @current_user, user
        render :show, status: :created, location: @entry
      else
        render json: @entry.errors, status: :unprocessable_entity
      end
  end

  # PATCH/PUT /entries/1
  def update
      if @entry.update(entry_params)
        render :show, status: :ok, location: @entry 
      else
        render json: @entry.errors, status: :unprocessable_entity 
      end
  end

  # DELETE /entries/1
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

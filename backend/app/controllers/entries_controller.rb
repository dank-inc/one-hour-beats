class EntriesController < ApplicationController
  before_action :set_entry, only: [:show, :edit, :update, :destroy]

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
    
    @entry.id = "#{@entry.jam_id}_#{@entry.user_id}_#{@entry.title.split(' ').join('_').downcase}"

    respond_to do |format|
      if @entry.save
        
        VoteToken.create!(
          user_id: @entry.user_id,
          jam_id: @entry.jam_id
        )
    
        # user channel send user with vote_tokens
        JamroomChannel.broadcast_to @entry.jam, { entry: @entry }
        format.json { render :show, status: :created, location: @entry }
      else
        format.json { render json: @entry.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /entries/1
  def update
    respond_to do |format|
      if @entry.update(entry_params)
        format.json { render :show, status: :ok, location: @entry }
      else
        format.json { render json: @entry.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /entries/1
  def destroy
    @entry.destroy
    respond_to do |format|
      # Add some kind of realtime shit for deleting entries
      format.json { head :no_content }
    end
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

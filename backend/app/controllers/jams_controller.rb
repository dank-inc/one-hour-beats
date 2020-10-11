class JamsController < ApplicationController
  # before_action :get_logged_in_user, only: [:jams, :entries]
  before_action :authorize_request #, only: [:submit_chat, :start, :stop, :edit, :create, :update, :destroy]
  before_action :set_jam, only: [:submit_chat, :entries, :start, :stop, :show, :edit, :update, :destroy]

  # POST /jams/:id/start
  def start
    if @jam.started_at
      head :unprocessable_entity
    else 
      @jam.start!
      JamsChannel.broadcast_to :global, true
      JamroomChannel.broadcast_to @jam, true
      head :ok
    end
  end 

  # POST /jams/:id/stop
  def stop
    @jam.stop!
    JamsChannel.broadcast_to :global, true
    JamroomChannel.broadcast_to @jam, true
    head :ok
  end 

  def upload 
    @jam = Jam.find(params[:id])
    @file = params[:file] 
    
    puts ">> uploading: #{@jam.id}/#{@current_user.username}_#{@file.original_filename}"
    uploaddir = "uploads/#{@jam.id}"
    # TODO: get user_id from auth token.
    # TODO: get title

    path = "#{uploaddir}/#{@file.original_filename}"
    FileUtils.mkdir_p("public/#{uploaddir}") unless File.directory?("public/#{uploaddir}")
    newfile = File.open("public/#{path}", "wb") { |f| f.write @file.read }

    render json: { path: path }, status: :ok
  end


  # GET /jams
  def index
    if @current_user
      @jams = Jam.all
    else
      @jams = Jam.elapsed
    end
  end

  # GET /jams/1
  def show
  end

  # POST /jams
  def create
    # if more than 1 jam for user don't allow
    if @current_user.jams.count
      render :unprocessable_entity
    end

    @jam = Jam.new(jam_params)
    @jam.user_id = @current_user.id
    @jam.id = @jam.name.split(' ').join('_').downcase



    if @jam.save!
      JamsChannel.broadcast_to :global, true
      render :show, status: :created, location: @jam 
    else
      render json: @jam.errors, status: :unprocessable_entity 
    end
  end

  # PATCH/PUT /jams/1
  def update
    if @jam.update(jam_params)
      JamsChannel.broadcast_to :global, true
      render :show, status: :ok, location: @jam 
    else
      render json: @jam.errors, status: :unprocessable_entity 
    end
  end

  # DELETE /jams/1
  def destroy
    @jam.destroy
    JamsChannel.broadcast_to :global, true
      head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_jam
      @jam = Jam.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def jam_params
      params.require(:jam).permit(:name, :description, :time_limit, :user_id, :started_at, :message)
    end
end

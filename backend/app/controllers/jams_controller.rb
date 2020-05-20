class JamsController < ApplicationController
  before_action :authorize_request
  before_action :set_jam, only: [:submit_chat, :entries, :start, :stop, :show, :edit, :update, :destroy]

  # POST /jams/:id/start
  def start
    if @jam.started_at
      head :unprocessable_entity
    else 
      @jam.start! 
      
      jam = @jam.as_json
      jam[:entries] = @jam.entries

      AppContextChannel.broadcast_to :global, jam: jam
      head :ok
    end
  end 

  # POST /jams/:id/stop
  def stop
    @jam.stop!

    jam = @jam.as_json
    jam[:entries] = @jam.entries

    AppContextChannel.broadcast_to :global, jam: jam
    head :ok
  end 

  # GET /jams/:id/entries
  def entries
    render json: @jam.entries, status: :ok
  end 

  def submit_chat 
    # TODO: need a chat controller, dog
    puts "chat recieved #{params}"
    user = User.find params[:user_id]
    chat = {
      message: params[:message],
      user_id: user.id, # TODO: get form session
      username: user.username,
      # TODO COLOR
      jam_id: @jam.id
    }

    puts "chat submitted #{chat}"

    JamroomChannel.broadcast_to @jam, chat: chat
  end

  def upload 
    @jam = Jam.find(params[:id])
    @file = params[:file] 
    
    puts ">> uploading: #{@jam.id}/#{@file.original_filename}"
    uploaddir = "uploads/#{@jam.id}"

    # TODO: get user_id from auth token.
    # TODO: get title

    # filename = "#{user_id}-#{title.split(' ').join('_').downcase}"

    path = "#{uploaddir}/#{@file.original_filename}"
    FileUtils.mkdir_p("public/#{uploaddir}") unless File.directory?("public/#{uploaddir}")
    newfile = File.open("public/#{path}", "wb") { |f| f.write @file.read }

    render json: { path: path }, status: :ok
  end


  # GET /jams
  def index
    @jams = Jam.all
  end

  # GET /jams/1
  def show
  end

  # POST /jams
  def create
    @jam = Jam.new(jam_params)
    @jam.id = @jam.name.split(' ').join('_')

    if @jam.save!
      jam = @jam.as_json
      jam[:entries] = []

      AppContextChannel.broadcast_to :global, jam: jam
      render :show, status: :created, location: @jam 
    else
      render json: @jam.errors, status: :unprocessable_entity 
    end
  end

  # PATCH/PUT /jams/1
  def update
    if @jam.update(jam_params)
      render :show, status: :ok, location: @jam 
    else
      render json: @jam.errors, status: :unprocessable_entity 
    end
  end

  # DELETE /jams/1
  def destroy
    @jam.destroy
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

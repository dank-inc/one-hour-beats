class JamsController < ApplicationController
  before_action :set_jam, only: [:start, :stop, :show, :edit, :update, :destroy]

  # POST /jams/:id/start
  def start
    if @jam.started_at
      head :unprocessable_entity
    else 
      @jam.start! 
      head :ok
    end
  end 

  # POST /jams/:id/stop
  def stop
    @jam.stop!
    head :ok
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

  # GET /jams/new
  def new
    @jam = Jam.new
  end

  # GET /jams/1/edit
  def edit
  end

  # POST /jams
  def create

    @jam = Jam.new(jam_params)
    @jam.id = @jam.name.split(' ').join('_')

    respond_to do |format|
      if @jam.save
        format.json { render :show, status: :created, location: @jam }
      else
        format.json { render json: @jam.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /jams/1
  def update
    respond_to do |format|
      if @jam.update(jam_params)
        format.json { render :show, status: :ok, location: @jam }
      else
        format.json { render json: @jam.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /jams/1
  # DELETE /jams/1.json
  def destroy
    @jam.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_jam
      @jam = Jam.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def jam_params
      params.require(:jam).permit(:name, :description, :time_limit, :user_id, :started_at)
    end
end

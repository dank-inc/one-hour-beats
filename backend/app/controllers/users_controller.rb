class UsersController < ApplicationController
  before_action :authorize_request, except: :create
  before_action :set_user, only: [:edit, :update, :destroy]

  def login 
    @user = User.find_by(username: params[:username])
    if @user && @user.password == params[:password]
      user = @user.as_json
      user[:vote_tokens] = @user.vote_tokens
      
      render json: user, status: :ok
    else
      @user = nil
      render json: {}, status: 401
    end
  end

  # GET /users
  def index
    @users = User.all
  end

  # GET /users/:id
  def show
    @user = User.find_by_username!(params[:id])
  end

  # POST /users
  def create
    @user = User.new(user_params)
    
    @user.id = SecureRandom.uuid
    if @user.save
      render :show, status: :created, location: @user 
    else
      render json: @user.errors, status: :unprocessable_entity 
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render :show, status: :ok, location: @user 
    else
      render json: @user.errors, status: :unprocessable_entity 
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :name, :email, :password, :thumbs, :wins)
    end
end

class UsersController < ApplicationController
  before_action :authorize_request, except: [:create, :check_invite, :accept_invite]
  before_action :set_user, only: [:show, :edit, :update, :destroy]

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

  def check_invite
    if Invitation.find_by token: params[:token]
      head :ok 
    else 
      head :unauthorized
    end
  end

  def check_username
    # check username
    
  end

  def accept_invite
    invite = Invitation.find_by token: params[:token]
    if invite
      @user = User.new(user_params)
      @user.id = SecureRandom.uuid
      if @user.save
        head :ok
      else
        head :unprocessable_entity
      end
    else 
      head :unauthorized
    end
  end

  # POST /users/:id/invite
  def invite
    # eventually check some big rules to see if a user can invite. 
    # invitations_count = @current_user.invitations&.length.to_i
    # entries_count = @current_user.entries&.length.to_i
    # challenges_count = @current_user.jams&.length.to_i

    # if invitations_count < challenges_count * entries_count
    # @current_user.active_invitation || 
    invite = Invitation.create!(invited_by: @current_user.id, token: SecureRandom.hex)
      
      render json: invite, status: :ok
    # else 
      # head :not_authorized # give the user some feedback as to why
    # end

  end

  # GET /users
  def index
    @users = User.all
  end

  # GET /users/:id
  def show
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

  # PUT /users/:id
  def update
    if @user.update(user_params)
      user = @user.as_json
      user[:vote_tokens] = @user.vote_tokens

      UserContextChannel.broadcast_to @user, user
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
      params.permit(:username, :name, :email, :password, :thumbs, :wins, :color)
    end
end

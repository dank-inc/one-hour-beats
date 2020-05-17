class VoteTokensController < ApplicationController
  before_action :set_vote_token, only: [:show, :edit, :update, :destroy]

  # GET /vote_tokens
  def index
    @vote_tokens = VoteToken.all
  end

  # GET /vote_tokens/1
  def show
  end

  # POST /vote_tokens
  def create
    @vote_token = VoteToken.new(vote_token_params)

    if @vote_token.save
      render :show, status: :created, location: @vote_token 
    else
      render json: @vote_token.errors, status: :unprocessable_entity 
    end
  end

  # PATCH/PUT /vote_tokens/1
  def update
    if @vote_token.update(vote_token_params)
      render :show, status: :ok, location: @vote_token 
    else
      render json: @vote_token.errors, status: :unprocessable_entity 
    end
  end

  # DELETE /vote_tokens/1
  def destroy
    @vote_token.destroy
    head :no_content 
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_vote_token
      @vote_token = VoteToken.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def vote_token_params
      params.require(:vote_token).permit(:user_id, :jam_id, :entry_id)
    end
end

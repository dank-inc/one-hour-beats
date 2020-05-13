class VoteTokensController < ApplicationController
  before_action :set_vote_token, only: [:show, :edit, :update, :destroy]

  # GET /vote_tokens
  # GET /vote_tokens.json
  def index
    @vote_tokens = VoteToken.all
  end

  # GET /vote_tokens/1
  # GET /vote_tokens/1.json
  def show
  end

  # GET /vote_tokens/new
  def new
    @vote_token = VoteToken.new
  end

  # GET /vote_tokens/1/edit
  def edit
  end

  # POST /vote_tokens
  # POST /vote_tokens.json
  def create
    @vote_token = VoteToken.new(vote_token_params)

    respond_to do |format|
      if @vote_token.save
        format.html { redirect_to @vote_token, notice: 'Vote token was successfully created.' }
        format.json { render :show, status: :created, location: @vote_token }
      else
        format.html { render :new }
        format.json { render json: @vote_token.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /vote_tokens/1
  # PATCH/PUT /vote_tokens/1.json
  def update
    respond_to do |format|
      if @vote_token.update(vote_token_params)
        format.html { redirect_to @vote_token, notice: 'Vote token was successfully updated.' }
        format.json { render :show, status: :ok, location: @vote_token }
      else
        format.html { render :edit }
        format.json { render json: @vote_token.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /vote_tokens/1
  # DELETE /vote_tokens/1.json
  def destroy
    @vote_token.destroy
    respond_to do |format|
      format.html { redirect_to vote_tokens_url, notice: 'Vote token was successfully destroyed.' }
      format.json { head :no_content }
    end
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

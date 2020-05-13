require 'test_helper'

class VoteTokensControllerTest < ActionDispatch::IntegrationTest
  setup do
    @vote_token = vote_tokens(:one)
  end

  test "should get index" do
    get vote_tokens_url
    assert_response :success
  end

  test "should get new" do
    get new_vote_token_url
    assert_response :success
  end

  test "should create vote_token" do
    assert_difference('VoteToken.count') do
      post vote_tokens_url, params: { vote_token: { entry_id: @vote_token.entry_id, jam_id: @vote_token.jam_id, user_id: @vote_token.user_id } }
    end

    assert_redirected_to vote_token_url(VoteToken.last)
  end

  test "should show vote_token" do
    get vote_token_url(@vote_token)
    assert_response :success
  end

  test "should get edit" do
    get edit_vote_token_url(@vote_token)
    assert_response :success
  end

  test "should update vote_token" do
    patch vote_token_url(@vote_token), params: { vote_token: { entry_id: @vote_token.entry_id, jam_id: @vote_token.jam_id, user_id: @vote_token.user_id } }
    assert_redirected_to vote_token_url(@vote_token)
  end

  test "should destroy vote_token" do
    assert_difference('VoteToken.count', -1) do
      delete vote_token_url(@vote_token)
    end

    assert_redirected_to vote_tokens_url
  end
end

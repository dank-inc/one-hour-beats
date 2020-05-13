require "application_system_test_case"

class VoteTokensTest < ApplicationSystemTestCase
  setup do
    @vote_token = vote_tokens(:one)
  end

  test "visiting the index" do
    visit vote_tokens_url
    assert_selector "h1", text: "Vote Tokens"
  end

  test "creating a Vote token" do
    visit vote_tokens_url
    click_on "New Vote Token"

    fill_in "Entry", with: @vote_token.entry_id
    fill_in "Jam", with: @vote_token.jam_id
    fill_in "User", with: @vote_token.user_id
    click_on "Create Vote token"

    assert_text "Vote token was successfully created"
    click_on "Back"
  end

  test "updating a Vote token" do
    visit vote_tokens_url
    click_on "Edit", match: :first

    fill_in "Entry", with: @vote_token.entry_id
    fill_in "Jam", with: @vote_token.jam_id
    fill_in "User", with: @vote_token.user_id
    click_on "Update Vote token"

    assert_text "Vote token was successfully updated"
    click_on "Back"
  end

  test "destroying a Vote token" do
    visit vote_tokens_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Vote token was successfully destroyed"
  end
end

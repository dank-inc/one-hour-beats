require "application_system_test_case"

class JamsTest < ApplicationSystemTestCase
  setup do
    @jam = jams(:one)
  end

  test "visiting the index" do
    visit jams_url
    assert_selector "h1", text: "Jams"
  end

  test "creating a Jam" do
    visit jams_url
    click_on "New Jam"

    fill_in "Description", with: @jam.description
    fill_in "Name", with: @jam.name
    fill_in "Started at", with: @jam.started_at
    fill_in "Time limit", with: @jam.time_limit
    fill_in "User", with: @jam.user_id
    click_on "Create Jam"

    assert_text "Jam was successfully created"
    click_on "Back"
  end

  test "updating a Jam" do
    visit jams_url
    click_on "Edit", match: :first

    fill_in "Description", with: @jam.description
    fill_in "Name", with: @jam.name
    fill_in "Started at", with: @jam.started_at
    fill_in "Time limit", with: @jam.time_limit
    fill_in "User", with: @jam.user_id
    click_on "Update Jam"

    assert_text "Jam was successfully updated"
    click_on "Back"
  end

  test "destroying a Jam" do
    visit jams_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Jam was successfully destroyed"
  end
end

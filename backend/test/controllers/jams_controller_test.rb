require 'test_helper'

class JamsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @jam = jams(:one)
  end

  test "should get index" do
    get jams_url
    assert_response :success
  end

  test "should get new" do
    get new_jam_url
    assert_response :success
  end

  test "should create jam" do
    assert_difference('Jam.count') do
      post jams_url, params: { jam: { description: @jam.description, name: @jam.name, started_at: @jam.started_at, time_limit: @jam.time_limit, user_id: @jam.user_id } }
    end

    assert_redirected_to jam_url(Jam.last)
  end

  test "should show jam" do
    get jam_url(@jam)
    assert_response :success
  end

  test "should get edit" do
    get edit_jam_url(@jam)
    assert_response :success
  end

  test "should update jam" do
    patch jam_url(@jam), params: { jam: { description: @jam.description, name: @jam.name, started_at: @jam.started_at, time_limit: @jam.time_limit, user_id: @jam.user_id } }
    assert_redirected_to jam_url(@jam)
  end

  test "should destroy jam" do
    assert_difference('Jam.count', -1) do
      delete jam_url(@jam)
    end

    assert_redirected_to jams_url
  end
end

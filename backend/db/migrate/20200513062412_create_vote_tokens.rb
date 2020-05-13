class CreateVoteTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :vote_tokens do |t|
      t.string :user_id
      t.string :jam_id
      t.string :entry_id
    end
  end
end

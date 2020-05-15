class CreateVoteTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :vote_tokens, id: false do |t|
      t.string :user_id, foreign_key: true, null: false
      t.string :jam_id, foreign_key: true, null: false
      t.string :entry_id, foreign_key: true, null: true
    end
  end
end

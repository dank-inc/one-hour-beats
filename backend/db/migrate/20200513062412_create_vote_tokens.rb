class CreateVoteTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :vote_tokens, id: :uuid do |t|
      t.uuid :user_id, foreign_key: true, null: false
      t.string :jam_id, foreign_key: true, null: false
      t.uuid :entry_id, index: true
    end
  end
end

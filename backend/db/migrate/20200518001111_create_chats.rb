class CreateChats < ActiveRecord::Migration[6.0]
  def change
    create_table :chats, id: :uuid do |t|
      t.uuid :user_id, foreign_key: true, null: false
      t.string :jam_id, foreign_key: true, null: false
      t.string :message

      t.timestamps
    end
  end
end

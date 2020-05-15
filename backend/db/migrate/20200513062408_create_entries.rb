class CreateEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :entries, id: false do |t|
      t.string :id, primary_key: true
      t.string :title, null: false
      t.string :link, null: false
      t.string :user_id, foreign_key: true, null: false
      t.string :jam_id, foreign_key: true, null: false

      t.timestamps
    end
  end
end

class CreateEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :entries do |t|
      t.string :title, null: false
      t.string :link, null: false
      t.string :user_id, null: false
      t.string :jam_id, null: false

      t.timestamps
    end
  end
end

class CreateEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :entries do |t|
      t.string :title
      t.string :link
      t.string :user_id
      t.string :jam_id
      t.string :string

      t.timestamps
    end
  end
end

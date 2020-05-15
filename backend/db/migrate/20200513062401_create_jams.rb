class CreateJams < ActiveRecord::Migration[6.0]
  def change
    create_table :jams do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.integer :time_limit, null: false, default: 60
      t.string :user_id, null: false
      t.datetime :started_at

      t.timestamps
    end
  end
end

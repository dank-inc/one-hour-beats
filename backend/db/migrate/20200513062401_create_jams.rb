class CreateJams < ActiveRecord::Migration[6.0]
  def change
    create_table :jams do |t|
      t.string :name
      t.string :description
      t.integer :time_limit
      t.string :user_id
      t.datetime :started_at

      t.timestamps
    end
  end
end

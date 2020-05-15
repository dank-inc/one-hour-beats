class CreateJams < ActiveRecord::Migration[6.0]
  def change
    create_table :jams, id: false do |t|
      t.string :id, primary_key: true
      t.string :name, null: false
      t.string :description, null: false
      t.integer :time_limit, null: false, default: 60
      t.string :user_id, foreign_key: true, null: false
      t.datetime :started_at

      t.timestamps
    end
  end
end

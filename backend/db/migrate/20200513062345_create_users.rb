class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users, id: false do |t|
      t.string :id, primary_key: true
      t.string :username, null: false
      t.string :name, null: false
      t.string :email, null: false
      t.string :password, null: false
      t.string :color
      t.integer :thumbs, default: 0
      t.integer :wins, default: 0
      
      t.timestamps
    end
  end
end

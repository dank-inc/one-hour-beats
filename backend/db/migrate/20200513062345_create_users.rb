class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users, id: :uuid do |t|
      t.string :username, null: false
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :color
      t.integer :thumbs, default: 0
      t.integer :wins, default: 0
      
      t.timestamps
    end
  end
end

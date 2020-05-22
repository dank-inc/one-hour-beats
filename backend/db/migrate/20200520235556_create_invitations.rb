class CreateInvitations < ActiveRecord::Migration[6.0]
  def change
    create_table :invitations, id: :uuid do |t|
      t.uuid :invited_by, foreign_key: true, null: false
      t.uuid :claimed_by
      t.string :token, index: true, null: false

      t.timestamps
    end
  end
end

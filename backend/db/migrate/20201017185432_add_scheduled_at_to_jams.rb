class AddScheduledAtToJams < ActiveRecord::Migration[6.0]
  def up
    change_table :jams do |t|
      t.datetime :scheduled_at
    end

    # add begin_at field
    Jam.where.not(started_at: nil).all.each do |jam|
      jam.update!(scheduled_at: jam.started_at)
    end

    Jam.where(started_at: nil).update_all ["scheduled_at = ?", 1.day.from_now]
  end

  def down
    remove_column :jams, :scheduled_at
  end
end

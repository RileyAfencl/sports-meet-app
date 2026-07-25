class CreateProfileActivities < ActiveRecord::Migration[8.1]
  def change
    create_table :profile_activities do |t|
      t.references :profile, null: false, foreign_key: true
      t.references :activity, null: false, foreign_key: true

      t.index [:profile_id, :activity_id], unique: true

      t.timestamps null: false
    end
  end
end

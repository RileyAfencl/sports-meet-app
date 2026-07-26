class CreatePostings < ActiveRecord::Migration[8.1]
  def change
    create_table :postings do |t|
      t.references :creator_profile, null: false, foreign_key: { to_table: :profiles }
      t.references :activity, null: false, foreign_key: true
      t.string :title, null: false
      t.text :description
      t.datetime :starts_at, null: false
      t.string :location_name, null: false
      t.string :location_address
      t.integer :participant_visibility, null: false
      t.integer :participant_age_min
      t.integer :participant_age_max
      t.integer :participant_limit

      t.timestamps null: false
    end
  end
end

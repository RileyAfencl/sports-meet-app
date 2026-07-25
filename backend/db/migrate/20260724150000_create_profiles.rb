class CreateProfiles < ActiveRecord::Migration[8.1]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :sex, null: false
      t.string :profile_photo_key
      t.integer :visibility_preference, null: false
      t.integer :availability_preference, null: false
      t.text :about_me

      t.timestamps null: false
    end
  end
end

class AddDateOfBirthToProfiles < ActiveRecord::Migration[8.1]
  def change
    add_column :profiles, :date_of_birth, :date, null: false
  end
end

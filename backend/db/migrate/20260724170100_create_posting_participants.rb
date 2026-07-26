class CreatePostingParticipants < ActiveRecord::Migration[8.1]
  def change
    create_table :posting_participants do |t|
      t.references :posting, null: false, foreign_key: true
      t.references :profile, null: false, foreign_key: true

      t.index [:posting_id, :profile_id], unique: true

      t.timestamps null: false
    end
  end
end

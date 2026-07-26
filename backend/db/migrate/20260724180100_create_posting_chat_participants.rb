class CreatePostingChatParticipants < ActiveRecord::Migration[8.1]
  def change
    create_table :posting_chat_participants do |t|
      t.references :posting_chat, null: false, foreign_key: true
      t.references :profile, null: false, foreign_key: true

      t.index [:posting_chat_id, :profile_id], unique: true

      t.timestamps null: false
    end
  end
end

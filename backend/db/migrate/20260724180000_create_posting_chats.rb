class CreatePostingChats < ActiveRecord::Migration[8.1]
  def change
    create_table :posting_chats do |t|
      t.references :posting, null: false, foreign_key: true, index: { unique: true }

      t.timestamps null: false
    end
  end
end

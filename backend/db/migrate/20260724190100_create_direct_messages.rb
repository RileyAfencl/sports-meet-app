class CreateDirectMessages < ActiveRecord::Migration[8.1]
  def change
    create_table :direct_messages do |t|
      t.references :direct_message_conversation, null: false, foreign_key: true
      t.references :sender_profile, null: false, foreign_key: { to_table: :profiles }
      t.text :body, null: false
      t.datetime :sent_at, null: false

      t.timestamps null: false
    end
  end
end

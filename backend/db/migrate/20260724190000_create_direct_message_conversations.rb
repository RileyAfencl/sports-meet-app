class CreateDirectMessageConversations < ActiveRecord::Migration[8.1]
  def change
    create_table :direct_message_conversations do |t|
      t.references :profile_one, null: false, foreign_key: { to_table: :profiles }
      t.references :profile_two, null: false, foreign_key: { to_table: :profiles }

      t.index [:profile_one_id, :profile_two_id], unique: true

      t.timestamps null: false
    end

    add_check_constraint :direct_message_conversations,
                         "profile_one_id < profile_two_id",
                         name: "profile_one_id_less_than_profile_two_id"
  end
end

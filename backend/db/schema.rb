# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_07_30_170000) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "activities", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_activities_on_name", unique: true
  end

  create_table "direct_message_conversations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "profile_one_id", null: false
    t.bigint "profile_two_id", null: false
    t.datetime "updated_at", null: false
    t.index ["profile_one_id", "profile_two_id"], name: "idx_on_profile_one_id_profile_two_id_363a2debea", unique: true
    t.index ["profile_one_id"], name: "index_direct_message_conversations_on_profile_one_id"
    t.index ["profile_two_id"], name: "index_direct_message_conversations_on_profile_two_id"
    t.check_constraint "profile_one_id < profile_two_id", name: "profile_one_id_less_than_profile_two_id"
  end

  create_table "direct_messages", force: :cascade do |t|
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.bigint "direct_message_conversation_id", null: false
    t.bigint "sender_profile_id", null: false
    t.datetime "sent_at", null: false
    t.datetime "updated_at", null: false
    t.index ["direct_message_conversation_id"], name: "index_direct_messages_on_direct_message_conversation_id"
    t.index ["sender_profile_id"], name: "index_direct_messages_on_sender_profile_id"
  end

  create_table "posting_chat_messages", force: :cascade do |t|
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.bigint "posting_chat_id", null: false
    t.bigint "sender_profile_id", null: false
    t.datetime "sent_at", null: false
    t.datetime "updated_at", null: false
    t.index ["posting_chat_id"], name: "index_posting_chat_messages_on_posting_chat_id"
    t.index ["sender_profile_id"], name: "index_posting_chat_messages_on_sender_profile_id"
  end

  create_table "posting_chat_participants", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "posting_chat_id", null: false
    t.bigint "profile_id", null: false
    t.datetime "updated_at", null: false
    t.index ["posting_chat_id", "profile_id"], name: "idx_on_posting_chat_id_profile_id_0806bfa9fe", unique: true
    t.index ["posting_chat_id"], name: "index_posting_chat_participants_on_posting_chat_id"
    t.index ["profile_id"], name: "index_posting_chat_participants_on_profile_id"
  end

  create_table "posting_chats", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "posting_id", null: false
    t.datetime "updated_at", null: false
    t.index ["posting_id"], name: "index_posting_chats_on_posting_id", unique: true
  end

  create_table "posting_participants", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "posting_id", null: false
    t.bigint "profile_id", null: false
    t.datetime "updated_at", null: false
    t.index ["posting_id", "profile_id"], name: "index_posting_participants_on_posting_id_and_profile_id", unique: true
    t.index ["posting_id"], name: "index_posting_participants_on_posting_id"
    t.index ["profile_id"], name: "index_posting_participants_on_profile_id"
  end

  create_table "postings", force: :cascade do |t|
    t.bigint "activity_id", null: false
    t.datetime "created_at", null: false
    t.bigint "creator_profile_id", null: false
    t.text "description"
    t.string "location_address"
    t.string "location_name", null: false
    t.integer "participant_age_max"
    t.integer "participant_age_min"
    t.integer "participant_limit"
    t.integer "participant_visibility", null: false
    t.datetime "starts_at", null: false
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_id"], name: "index_postings_on_activity_id"
    t.index ["creator_profile_id"], name: "index_postings_on_creator_profile_id"
  end

  create_table "profile_activities", force: :cascade do |t|
    t.bigint "activity_id", null: false
    t.datetime "created_at", null: false
    t.bigint "profile_id", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_id"], name: "index_profile_activities_on_activity_id"
    t.index ["profile_id", "activity_id"], name: "index_profile_activities_on_profile_id_and_activity_id", unique: true
    t.index ["profile_id"], name: "index_profile_activities_on_profile_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.text "about_me"
    t.integer "availability_preference", null: false
    t.datetime "created_at", null: false
    t.date "date_of_birth", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "profile_photo_key"
    t.string "sex", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.integer "visibility_preference", null: false
    t.index ["user_id"], name: "index_profiles_on_user_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "direct_message_conversations", "profiles", column: "profile_one_id"
  add_foreign_key "direct_message_conversations", "profiles", column: "profile_two_id"
  add_foreign_key "direct_messages", "direct_message_conversations"
  add_foreign_key "direct_messages", "profiles", column: "sender_profile_id"
  add_foreign_key "posting_chat_messages", "posting_chats"
  add_foreign_key "posting_chat_messages", "profiles", column: "sender_profile_id"
  add_foreign_key "posting_chat_participants", "posting_chats"
  add_foreign_key "posting_chat_participants", "profiles"
  add_foreign_key "posting_chats", "postings"
  add_foreign_key "posting_participants", "postings"
  add_foreign_key "posting_participants", "profiles"
  add_foreign_key "postings", "activities"
  add_foreign_key "postings", "profiles", column: "creator_profile_id"
  add_foreign_key "profile_activities", "activities"
  add_foreign_key "profile_activities", "profiles"
  add_foreign_key "profiles", "users"
end

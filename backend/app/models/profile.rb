class Profile < ApplicationRecord
  SEX_OPTIONS = %w[male female other].freeze

  belongs_to :user

  has_many :profile_activities, dependent: :destroy
  has_many :activities, through: :profile_activities
  has_many :created_postings, class_name: "Posting", foreign_key: :creator_profile_id, dependent: :destroy
  has_many :posting_participants, dependent: :destroy
  has_many :postings, through: :posting_participants
  has_many :posting_chat_participants, dependent: :destroy
  has_many :posting_chats, through: :posting_chat_participants
  has_many :sent_posting_chat_messages,
           class_name: "PostingChatMessage",
           foreign_key: :sender_profile_id,
           dependent: :destroy
  has_many :direct_message_conversations_as_one,
           class_name: "DirectMessageConversation",
           foreign_key: :profile_one_id,
           dependent: :destroy
  has_many :direct_message_conversations_as_two,
           class_name: "DirectMessageConversation",
           foreign_key: :profile_two_id,
           dependent: :destroy
  has_many :sent_direct_messages,
           class_name: "DirectMessage",
           foreign_key: :sender_profile_id,
           dependent: :destroy

  enum :availability_preference, {
    any: 0,
    morning: 1,
    afternoon: 2,
    evening: 3,
    morning_afternoon: 4,
    morning_evening: 5,
    afternoon_evening: 6
  }

  enum :visibility_preference, {
    anyone: 0,
    male: 1,
    female: 2,
    other: 3,
    male_female: 4,
    male_other: 5,
    female_other: 6
  }, prefix: true

  validates :user_id, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :sex, presence: true, inclusion: { in: SEX_OPTIONS }
  validates :date_of_birth, presence: true
  validates :visibility_preference, presence: true
  validates :availability_preference, presence: true

  def age
    return nil if date_of_birth.blank?

    today = Date.current
    age = today.year - date_of_birth.year
    age -= 1 if today < date_of_birth.change(year: today.year)

    age
  end
end

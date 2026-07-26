class DirectMessage < ApplicationRecord
  belongs_to :direct_message_conversation
  belongs_to :sender_profile, class_name: "Profile"

  validates :direct_message_conversation_id, presence: true
  validates :sender_profile_id, presence: true
  validates :body, presence: true
  validates :sent_at, presence: true
  validate :sender_is_conversation_participant

  private

  def sender_is_conversation_participant
    return if direct_message_conversation.blank? || sender_profile_id.blank?

    conversation = direct_message_conversation
    unless [conversation.profile_one_id, conversation.profile_two_id].include?(sender_profile_id)
      errors.add(:sender_profile_id, "must be a participant in the conversation")
    end
  end
end

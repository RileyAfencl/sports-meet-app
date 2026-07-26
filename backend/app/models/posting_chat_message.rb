class PostingChatMessage < ApplicationRecord
  belongs_to :posting_chat
  belongs_to :sender_profile, class_name: "Profile"

  validates :posting_chat_id, presence: true
  validates :sender_profile_id, presence: true
  validates :body, presence: true
  validates :sent_at, presence: true
  validate :sender_is_chat_participant

  private

  def sender_is_chat_participant
    return if posting_chat.blank? || sender_profile_id.blank?

    unless posting_chat.posting_chat_participants.exists?(profile_id: sender_profile_id)
      errors.add(:sender_profile_id, "must be a participant in the chat")
    end
  end
end

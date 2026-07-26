class PostingChatParticipant < ApplicationRecord
  belongs_to :posting_chat
  belongs_to :profile

  validates :posting_chat_id, presence: true
  validates :profile_id, presence: true, uniqueness: { scope: :posting_chat_id }
  validate :profile_has_joined_posting

  before_destroy :prevent_creator_removal

  private

  def prevent_creator_removal
    return if posting_chat.blank? || profile_id.blank?

    if profile_id == posting_chat.posting.creator_profile_id
      errors.add(:base, "Posting creator cannot leave the chat")
      throw :abort
    end
  end

  def profile_has_joined_posting
    return if posting_chat.blank? || profile_id.blank?

    unless posting_chat.posting.posting_participants.exists?(profile_id: profile_id)
      errors.add(:profile_id, "must have joined the posting before joining the chat")
    end
  end
end

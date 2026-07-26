class PostingParticipant < ApplicationRecord
  belongs_to :posting
  belongs_to :profile

  validates :posting_id, presence: true
  validates :profile_id, presence: true, uniqueness: { scope: :posting_id }

  before_destroy :prevent_creator_removal

  private

  def prevent_creator_removal
    return if posting.blank? || profile_id.blank?

    if profile_id == posting.creator_profile_id
      errors.add(:base, "Posting creator cannot leave the posting")
      throw :abort
    end
  end
end

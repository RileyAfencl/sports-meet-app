class DirectMessageConversation < ApplicationRecord
  belongs_to :profile_one, class_name: "Profile"
  belongs_to :profile_two, class_name: "Profile"

  has_many :direct_messages, dependent: :destroy

  validates :profile_one_id, presence: true
  validates :profile_two_id, presence: true, uniqueness: { scope: :profile_one_id }
  validate :profiles_must_be_different

  before_validation :normalize_profile_order

  private

  def normalize_profile_order
    return if profile_one_id.blank? || profile_two_id.blank?
    return if profile_one_id == profile_two_id

    if profile_one_id > profile_two_id
      self.profile_one_id, self.profile_two_id = profile_two_id, profile_one_id
    end
  end

  def profiles_must_be_different
    return if profile_one_id.blank? || profile_two_id.blank?

    if profile_one_id == profile_two_id
      errors.add(:profile_two_id, "must be different from profile one")
    end
  end
end

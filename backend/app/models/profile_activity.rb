class ProfileActivity < ApplicationRecord
  belongs_to :profile
  belongs_to :activity

  validates :profile_id, presence: true
  validates :activity_id, presence: true, uniqueness: { scope: :profile_id }
end

class Posting < ApplicationRecord
  belongs_to :creator_profile, class_name: "Profile"
  belongs_to :activity

  has_many :posting_participants, dependent: :destroy
  has_many :participants, through: :posting_participants, source: :profile
  has_one :posting_chat, dependent: :destroy

  enum :participant_visibility, {
    anyone: 0,
    male: 1,
    female: 2,
    other: 3,
    male_female: 4,
    male_other: 5,
    female_other: 6
  }

  validates :creator_profile_id, presence: true
  validates :activity_id, presence: true
  validates :title, presence: true
  validates :starts_at, presence: true
  validates :location_name, presence: true
  validates :participant_visibility, presence: true

  after_create :create_default_associations

  private

  def create_default_associations
    posting_participants.create!(profile: creator_profile)
    create_posting_chat!
  end
end

class Profile < ApplicationRecord
  SEX_OPTIONS = %w[male female other].freeze

  belongs_to :user

  has_many :profile_activities, dependent: :destroy
  has_many :activities, through: :profile_activities

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
  validates :visibility_preference, presence: true
  validates :availability_preference, presence: true
end

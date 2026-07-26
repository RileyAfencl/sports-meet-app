class Activity < ApplicationRecord
  has_many :profile_activities, dependent: :destroy
  has_many :profiles, through: :profile_activities
  has_many :postings, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end

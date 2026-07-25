class Activity < ApplicationRecord
  has_many :profile_activities, dependent: :destroy
  has_many :profiles, through: :profile_activities

  validates :name, presence: true, uniqueness: true
end

class ProfileSerializer
  AVAILABILITY_TO_PREFERRED_TIMES = {
    "any" => ["Any"],
    "morning" => ["Morning"],
    "afternoon" => ["Afternoon"],
    "evening" => ["Evening"],
    "morning_afternoon" => ["Morning", "Afternoon"],
    "morning_evening" => ["Morning", "Evening"],
    "afternoon_evening" => ["Afternoon", "Evening"]
  }.freeze

  VISIBILITY_TO_PREFERENCES = {
    "anyone" => ["anyone"],
    "male" => ["male"],
    "female" => ["female"],
    "other" => ["other"],
    "male_female" => %w[male female],
    "male_other" => %w[male other],
    "female_other" => %w[female other]
  }.freeze

  def initialize(profile)
    @profile = profile
  end

  def as_json
    {
      id: profile.id,
      userId: profile.user_id,
      firstName: profile.first_name,
      lastName: profile.last_name,
      dateOfBirth: profile.date_of_birth.iso8601,
      sex: profile.sex,
      activities: profile.activities.map(&:name),
      preferredTimes: preferred_times,
      visibilityPreferences: visibility_preferences,
      aboutMe: profile.about_me
    }.compact
  end

  def self.collection(profiles)
    profiles.map { |profile| new(profile).as_json }
  end

  private

  attr_reader :profile

  def preferred_times
    AVAILABILITY_TO_PREFERRED_TIMES.fetch(profile.availability_preference)
  end

  def visibility_preferences
    VISIBILITY_TO_PREFERENCES.fetch(profile.visibility_preference)
  end
end

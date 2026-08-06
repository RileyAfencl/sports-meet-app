class PostingSerializer
  VISIBILITY_TO_PREFERENCES = ProfileSerializer::VISIBILITY_TO_PREFERENCES

  def initialize(posting)
    @posting = posting
  end

  def as_json
    {
      id: posting.id,
      title: posting.title,
      activity: posting.activity.name,
      dateTime: posting.starts_at.iso8601,
      locationName: posting.location_name,
      description: posting.description,
      creator: ProfileSerializer.new(posting.creator_profile).as_json,
      participants: ProfileSerializer.collection(non_creator_participants),
      participantCount: participant_count,
      visibility: visibility,
      ageRange: {
        min: posting.participant_age_min,
        max: posting.participant_age_max
      }
    }.compact.merge(maxParticipants: posting.participant_limit)
  end

  def self.collection(postings)
    postings.map { |posting| new(posting).as_json }
  end

  private

  attr_reader :posting

  # Matches mock data — creator is shown separately, not in participants list.
  def non_creator_participants
    posting.participants.reject { |profile| profile.id == posting.creator_profile_id }
  end

  def participant_count
    non_creator_participants.length + 1
  end

  def visibility
    VISIBILITY_TO_PREFERENCES.fetch(posting.participant_visibility)
  end
end

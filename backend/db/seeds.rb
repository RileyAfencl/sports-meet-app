# Activity names from mobile/src/constants/activity-options.ts
ACTIVITY_NAMES = [
  "Lifting",
  "Hiking",
  "Basketball",
  "Bowling",
  "Soccer",
  "Pickleball",
  "Fishing",
  "Running",
  "Biking",
  "Golf",
  "Tennis",
  "Disc Golf",
  "Swimming"
].freeze

ACTIVITY_NAMES.each do |name|
  Activity.find_or_create_by!(name: name)
end

puts "Seeded #{Activity.count} activities"

# User data from mobile/src/mock-data/mock-users.ts
# Current user from mobile/src/mock-data/mock-current-user.ts (id 6)
MOCK_USERS = [
  { id: 1, email: "john.f@example.com", password: "password123" },
  { id: 2, email: "sarah.m@example.com", password: "password123" },
  { id: 3, email: "alex.t@example.com", password: "password123" },
  { id: 4, email: "josh.a@example.com", password: "password123" },
  { id: 5, email: "maria.p@example.com", password: "password123" },
  { id: 6, email: "riley.f@example.com", password: "password123" }
].freeze

MOCK_USERS.each do |attrs|
  user = User.find_or_initialize_by(id: attrs[:id])
  user.email = attrs[:email]
  user.password = attrs[:password] if user.new_record?
  user.save!
end

puts "Seeded #{User.count} users"

# Profile data from mobile/src/mock-data/mock-profiles.ts
# Profile id 6 from mobile/src/mock-data/mock-current-user.ts
MOCK_PROFILES = [
  {
    id: 1,
    user_id: 1,
    first_name: "John",
    last_name: "Finch",
    date_of_birth: "1999-11-11",
    sex: "male",
    visibility_preference: :anyone,
    availability_preference: :morning_evening,
    about_me: "I am looking for consistent activity partners who are reliable, easygoing, and interested in getting outside or training a few times a week. I usually prefer weekday evenings and weekends, and I am open to both casual sessions and more structured workouts depending on the activity. xxxxxxxxxxxxxxx",
    activities: ["Lifting", "Running", "Pickleball", "Hiking", "Basketball", "Swimming", "Golf"]
  },
  {
    id: 2,
    user_id: 2,
    first_name: "Sarah",
    last_name: "Mcquire",
    date_of_birth: "2002-06-01",
    sex: "female",
    visibility_preference: :female,
    availability_preference: :any,
    activities: ["Pickleball", "Hiking"]
  },
  {
    id: 3,
    user_id: 3,
    first_name: "Alex",
    last_name: "Tulos",
    date_of_birth: "1995-09-12",
    sex: "other",
    visibility_preference: :other,
    availability_preference: :any,
    activities: ["Lifting", "Basketball"]
  },
  {
    id: 4,
    user_id: 4,
    first_name: "Josh",
    last_name: "Allen",
    date_of_birth: "1995-07-05",
    sex: "other",
    visibility_preference: :other,
    availability_preference: :any,
    activities: ["Lifting", "Basketball", "Pickleball", "Bowling", "Running"]
  },
  {
    id: 5,
    user_id: 5,
    first_name: "Maria",
    last_name: "Panzeri",
    date_of_birth: "1998-08-02",
    sex: "female",
    visibility_preference: :female,
    availability_preference: :any,
    activities: ["Lifting", "Basketball", "Pickleball", "Bowling", "Running", "Hiking"]
  },
  {
    id: 6,
    user_id: 6,
    first_name: "Riley",
    last_name: "Fencl",
    date_of_birth: "1994-05-11",
    sex: "male",
    visibility_preference: :anyone,
    availability_preference: :morning_evening,
    about_me: "Avid lifter, interval trainer, and swimmer. I stick to an upper/lower split and my cardio is all interval training. Looking for a training partner, prefabaly a newer lifter.",
    activities: ["Lifting", "Running", "Swimming"]
  }
].freeze

MOCK_PROFILES.each do |attrs|
  activity_names = attrs[:activities]

  profile = Profile.find_or_initialize_by(id: attrs[:id])
  profile.assign_attributes(
    user_id: attrs[:user_id],
    first_name: attrs[:first_name],
    last_name: attrs[:last_name],
    date_of_birth: Date.parse(attrs[:date_of_birth]),
    sex: attrs[:sex],
    visibility_preference: attrs[:visibility_preference],
    availability_preference: attrs[:availability_preference],
    about_me: attrs[:about_me]
  )
  profile.save!

  activity_names.each do |name|
    activity = Activity.find_by!(name: name)
    ProfileActivity.find_or_create_by!(profile: profile, activity: activity)
  end
end

puts "Seeded #{Profile.count} profiles"
puts "Seeded #{ProfileActivity.count} profile activities"

# Posting data from mobile/src/mock-data/mock-postings.ts
# distanceMiles is frontend-only and is not seeded.
# Creator posting_participant + posting_chat + creator chat participant are created
# automatically by Posting's after_create callback on new records.
# Non-creator posting_participants are seeded below; chat participants stay creator-only.
# starts_at is assigned at seed time: random day 1–13 from now at 6:30 PM app timezone.
MOCK_POSTINGS = [
  {
    id: 1,
    title: "test posting one",
    activity: "Basketball",
    creator_profile_id: 1,
    location_name: "Southview Park",
    participant_limit: nil,
    participant_visibility: :anyone,
    participant_age_min: 21,
    participant_age_max: 35,
    participants: [2, 4, 3, 5]
  },
  {
    id: 2,
    title: "test posting two",
    activity: "Basketball",
    creator_profile_id: 2,
    location_name: "Grandwood Field",
    participant_limit: 6,
    participant_visibility: :female,
    participant_age_min: 25,
    participant_age_max: 30,
    participants: [1, 5]
  },
  {
    id: 3,
    title: "test posting three",
    activity: "Lifting",
    creator_profile_id: 4,
    location_name: "Oz Fitness",
    participant_limit: 6,
    participant_visibility: :anyone,
    participant_age_min: 21,
    participant_age_max: 50,
    participants: [2, 1, 3, 5]
  },
  {
    id: 4,
    title: "test posting four",
    activity: "Hiking",
    creator_profile_id: 4,
    location_name: "Great Canyon Park",
    participant_limit: 6,
    participant_visibility: :anyone,
    participant_age_min: 25,
    participant_age_max: 30,
    participants: [2, 1, 3]
  },
  {
    id: 5,
    title: "test posting five",
    activity: "Basketball",
    creator_profile_id: 5,
    location_name: "Rothwell Courts",
    participant_limit: 5,
    participant_visibility: :anyone,
    participant_age_min: 21,
    participant_age_max: 35,
    participants: [2, 3, 4, 1]
  },
  {
    id: 6,
    title: "test posting six",
    activity: "Basketball",
    creator_profile_id: 4,
    location_name: "Rothwell Courts",
    participant_limit: 6,
    participant_visibility: :anyone,
    participant_age_min: 21,
    participant_age_max: 35,
    participants: [2, 5, 3, 1]
  },
  {
    id: 7,
    title: "test posting seven",
    activity: "Basketball",
    creator_profile_id: 2,
    location_name: "Grandwood Field",
    participant_limit: 6,
    participant_visibility: :female,
    participant_age_min: 25,
    participant_age_max: 35,
    participants: [1, 4]
  }
].freeze

MOCK_POSTINGS.each do |attrs|
  participant_profile_ids = attrs[:participants]
  activity = Activity.find_by!(name: attrs[:activity])

  posting = Posting.find_or_initialize_by(id: attrs[:id])
  starts_at = rand(1..13).days.from_now.change(hour: 18, min: 30)
  posting.assign_attributes(
    creator_profile_id: attrs[:creator_profile_id],
    activity: activity,
    title: attrs[:title],
    starts_at: starts_at,
    location_name: attrs[:location_name],
    participant_limit: attrs[:participant_limit],
    participant_visibility: attrs[:participant_visibility],
    participant_age_min: attrs[:participant_age_min],
    participant_age_max: attrs[:participant_age_max]
  )
  posting.save!

  chat = posting.posting_chat || posting.create_posting_chat!

  unless posting.posting_participants.exists?(profile_id: posting.creator_profile_id)
    posting.posting_participants.create!(profile_id: posting.creator_profile_id)
  end

  unless chat.posting_chat_participants.exists?(profile_id: posting.creator_profile_id)
    chat.posting_chat_participants.create!(profile_id: posting.creator_profile_id)
  end

  participant_profile_ids.each do |profile_id|
    PostingParticipant.find_or_create_by!(posting: posting, profile_id: profile_id)
  end
end

puts "Seeded #{Posting.count} postings"
puts "Seeded #{PostingParticipant.count} posting participants"
puts "Seeded #{PostingChat.count} posting chats"
puts "Seeded #{PostingChatParticipant.count} posting chat participants"

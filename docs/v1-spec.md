## Core Design Guidelines

1. Facilitate real-world activity discovery, coordination, and meet-ups. 
2. Prioritize user safety, and control. 
3. This app is not a social media network app, this is to create a space where people of like interest may meet each other, and coordinate activities with one another. 
4. The scope of v1 is to create the base functionality of the app to assess initial performance at market. Scope is to be as limited as is necessary for the base product to get off the ground and into market. 
5. No monetization of any kind will be present in V1. That is all scoped for V2 dependent on V1 performance.
6. Collect the absolute minimum amount of personal information necessary for the app to function. We will sell no data of any kind. 
7. V1's deployment purpose is specifically to gauge the viability of the platform in market. 

## Location Specifics

### User Location
Each user maintains a primary location associated with their profile.

The purpose of the user location is discovery.

Users may:

Set a location during profile creation
Update their location at any time
Adjust their search radius during discovery

User discovery will utilize this location and radius to find nearby users that match the selected filters.

### Favorite Locations
Users may optionally save frequently used locations.

Examples:

YMCA
MUV Fitness
Comstock Park
Local Tennis Court

The purpose of favorite locations is convenience during activity creation.

Favorite locations are not used for user discovery or matching.

### Activity Locations
Activity Location

Each activity posting contains a specific location.

Users creating activities may:

Select a saved favorite location
Enter a custom location
Select a location on a map/pin interface

The purpose of activity locations is to communicate where the activity will occur.

Activity locations are not used as a primary user discovery mechanism in V1.

## Gender Preference, Visibility, and Messaging Rules

V1 will use gender preference settings as a global account-level control for user discovery and direct messaging.

### Profile Settings

During account creation, users select:

- Gender: Male or Female
- Seeking: Men, Women, or Everyone

These settings may be updated later in account settings.

### User Discovery

User discovery is preference-gated.

A user should only appear in another user's discovery results when both users' gender and seeking preferences are mutually compatible.

Examples:

- A woman seeking women will not see male profiles in user discovery.
- A woman seeking women will not appear in male user discovery.
- A man seeking everyone will only see women whose preferences allow male discovery.
- A man seeking men will only see compatible male profiles.

### Direct Messaging

Direct messaging follows the same mutual compatibility rule as user discovery.

A user may only directly message another user when both users' gender and seeking preferences allow that connection.

Joining the same activity does not automatically grant direct message access.

### Activity Posts

Activity posts have their own visibility setting:

- Men
- Women
- Everyone

If an activity is marked Everyone, users who can view the activity may RSVP and optionally participate in the temporary activity chat.

Activity chat participation is considered separate from direct messaging. Users who join an activity chat may communicate within that temporary activity context, but private direct messaging remains controlled by global gender preference rules.

### Safety Principle

The purpose of these rules is to reduce unwanted direct contact and give users control over who can discover and message them. A main goal of this app is to give users the ability and tools to protect themselves. 

### Discovery Architechture

DiscoveryScreen
│
├── Filters
│
├── Search Button
│
├── ActivitySection
│     │
│     ├── ProfileCard
│     ├── ProfileCard
│     └── ProfileCard
│
└── ProfileModal
      │
      ├── Picture
      ├── About Me
      ├── Activities
      ├── Preferred Times
      ├── Distance
      ├── Message
      ├── Report (...)
      └── Close

Search results is categorized and searchProfileCards are grouped undearneath their respective activity. 

searchProfileCards are simple the user picture, First/Last Age, and that card is clickable and brings up searchProfileModal. 

searchProfileModal contains all user profile information, a message button, a close button, and an x in the top right. It does not navigate to a new page, or change anything in the current discovery page so the user may return back to discovery upon review. If a user elects to message that user, it will reroute them to a new DM between them and that user, their searchProfileModal will also be available in the DM screen.

### Discovery Screen Filter Types: 

Hard eligibility:
cannot be bypassed by search controls

Profile defaults:
can be temporarily overridden without editing the profile

Direct search constraints:
exist only for the current search

### Polish Things to Do Before Launch
- Fix activities on profile modal to account for scaling into a large amount of activities selected. Most likely, list matching, then view all, or list matching first, 5 total and then view all button.
- When you hit discovery on the sidebar, it auto-uncollapses the postings board/messages button, need to fix that. 
- Fix activity selector in profile-create, needs to hide activities after first 3, list most recent 3 selected, a view all possible and a view all selected function. 
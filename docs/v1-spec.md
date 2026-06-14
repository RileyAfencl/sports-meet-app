# Core Design Guidelines

1. Facilitate real-world activity discovery, coordination, and meet-ups. 
2. Prioritize user safety, and control. 
3. This app is not a social media network app, this is to create a space where people of like interest may meet each other, and coordinate activities with one another. 
4. The scope of v1 is to create the base functionality of the app to assess initial performance at market. Scope is to be as limited as is necessary for the base product to get off the ground and into market. 
5. No monetization of any kind will be present in V1. That is all scoped for V2 dependent on V1 performance.
6. Collect the absolute minimum amount of personal information necessary for the app to function. We will sell no data of any kind. 
7. V1's deployment purpose is specifically to gauge the viability of the platform in market. 

# Core Features

1. Users create a Bio. Bios consist of the users selected profile picture, the activity tags the user chooses, visibility preferences (Male/Female/Any), Age, and preferred activity times. (These tags may be changed at anytime, and activity-time can be manually filtered)



# Location Specifics

## User Location
Each user maintains a primary location associated with their profile.

The purpose of the user location is discovery.

Users may:

Set a location during profile creation
Update their location at any time
Adjust their search radius during discovery

User discovery will utilize this location and radius to find nearby users that match the selected filters.

## Favorite Locations
Users may optionally save frequently used locations.

Examples:

YMCA
MUV Fitness
Comstock Park
Local Tennis Court

The purpose of favorite locations is convenience during activity creation.

Favorite locations are not used for user discovery or matching.

## Activity Locations
Activity Location

Each activity posting contains a specific location.

Users creating activities may:

Select a saved favorite location
Enter a custom location
Select a location on a map/pin interface

The purpose of activity locations is to communicate where the activity will occur.

Activity locations are not used as a primary user discovery mechanism in V1.
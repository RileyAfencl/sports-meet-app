# Sports Meet App

## Executive Summary

Sports Meet (working title) is a mobile app that is designed to help users discover partners for activities, and small group events through shared interests, availability and safety-first communication preferences. 

The platform facilitates these connections by allowing users to create a personal profile, discover other users of similar interests, create and join activity postings and communicate between individuals via direct messaging or activity-based chats. 

## Product Vision

Sports Meet exists to reduce the friction involved in finding activity partners and organizing groups for casual recreational activities.

The platform focuses on facilitating introductions and activity coordination rather than functioning as a traditional social media platform. The goal is to help users move from discovery to real-world interaction as efficiently and safely as possible.

## Problem Statement

Many people struggle to find partners for recreational activities despite having access to community centers, gyms, sports facilities, outdoor recreation areas, and large populations of individuals with similar interests. 

Existing solutions often suffer from one or more of the following: 
- Highly structured event coordination that can feel intimidating or require paid participation
- Poor tools for discovering and connecting with individuals locally
- Complex group management and participation requirements
- Limited support for casual, spontaneous activity coordination
- Little visibility into who will be attending an event
- Excessive social-media functionality that distracts from real-world interaction
- Insufficient safety controls and communication preferences for users

Sports Meet aims to reduce the friction between individuals looking to participate in activities and those seeking others to join them, creating a safer and more accessible path to real-world interaction.

## Target Users

Sports Meet is designed for adults seeking activity partners and small group events centered around shared interests and recreational activities.

The initial target audience includes:

- Fitness enthusiasts seeking workout partners
- Recreational sports participants
- Outdoor activity enthusiasts
- Individuals seeking new social connections through shared interests
- Individuals interested in simple, low-friction activity coordination

To simplify moderation, safety, and compliance requirements, V1 deployment will be limited to users aged 18 and older.

## Initial Activity Categories for V1-deployment

V1 will launch with support for the following activity categories: 

1. Lifting
2. Hiking
3. Basketball
4. Bowling
5. Soccer
6. Pickleball
7. Fishing
8. Running
9. Biking
10. Golf
11. Tennis
12. Disc golf

Additional activities will be added later on in future releases based on user adoption and feedback. 

## V1 Release Objective

The primary goal of the V1 release is to gauge consumer interest and viability of the platform. 

V1 is intentionally focused on validating product demand before introducing monetization or advanced platform features.

## Core Features & Flow

### Account Creation & Authentication

#### Account Creation

- Users open the app. 
- They are met with account sign-in (email/password) 
- New users select "create account" option. 
- Users will be asked to complete a captcha. 
- Users will be asked to provide an email. 
- Confirmation email will be sent. 
- User confirms email address through the verification link.  
- Once confirmed user creates password. 
- User is then redirected to Profile Creation. 

#### Authentication 

- Users sign into the platform using email and password. 
- Users may sign out at any time through account settings. 
- Users may request a password reset through email verification. 

#### Account Restrictions

- Users must be 18 years of age or older. 
- Only verified email accounts may access platform functionality. 
- Banned users may not access the platform using the banned account. 

### User Profiles

Users will create profiles for themselves that are viewable to other users. These profiles will include: 
- Display name
- Sex (M/F)
- A small bio
- Profile Picture
- Tags with their interests (Out of the 12 activities)
- Visibility & Communication preferences (Who can direct message/discover them)
- Time preferences (Morning/Afternoons/Evening), defaults to any.
- Set a location via pin. Radius is adjusted in User Discovery.
- Age Verification Confirmation (18+), DoB input, however Age is displayed as a value. 

All settings can be changed at any given time.

### Account and Profile Creation Restriction

Users must complete the create a profile redirection after account creation for an account to have access to app features. If for any reason an account is created but does not have a complete profile creation associated with it, that account will only have access and be redirected to profile creation until that step is complete. 

The minimum requirements for profile completion are: 

- Display Name
- One Activity Tag
- Communication preferences
- Sex (M/F)
- Location Pin
- Age Verification Confirmation (18+), DoB input

### User Discovery

Users will then be directed to a front page consisting of filters and other user profiles. The goal is to provide two ways in which users may connect with one another. This will be the first option which is just a filtering for profiles that match interests. Upon redirection to the front page users will encounter a small welcome banner that gives a quick explanation of the two options:

Welcome to Sports Meet! On this page you may filter users by multiple criteria to find people who might be a good fit for an activity partner. Or, you may look at the posting board by selecting the button on the left-side of the page that says "Activity Posting Board". This will show you postings for activities by different users which you may reach out to, or you can create your own postings if you'd rather someone else reaches out to you! *Some slogan by Trebor here as the sign off*

Below the welcome banner they will see filters for:

- Activity Tags (Running/Biking/Lifting/etc)
- Morning/Afternoon/Evening
- Days
- Radius from location (Slider bar)
- Age Range

Once the user has set their filters and hits search they will be presented with a list, separated by activity, of profiles that match the filter criteria given. Users may then click these profiles, and view their bios and relevant information and may elect to the DM that user. 

### Activity Discovery and Posting

While user discovery allows users to find individuals with similar interests, the platform also provides a second method of connection through the activity posting board. 

The purpose of the posting board is to solve the friction of initial contact. While we do expect many users to simply reach out, we expect that many of them will not, due to the discomfort of directly messaging a stranger. The idea behind the posting board is to allow users to bypass most of that discomfort, by posting or joining activities. In either case, a posted activity acts as an open invitation for connection, which will allow more users to feel comfortable reaching out to one another.

Users will have a button for the Activity Posting Board. If a user wishes to check active postings or create one they will click this button. Once this button is clicked it will default redirect to a new page that consists of three options: 

- View All Postings (Visibility prefences apply)
- Search Postings by criteria
- Create Posting

If users select View All Postings, they will simply be shown all postings available currently that are within their visibility settings. The goal behind this functionality is that we expect some users may be interested in trying out different activities, and this gives them a more casual method of discovery rather than hard selecting a specific activity. 

If users select Postings by criteria, they will be present with the same filtering methods as the front page, and upon hitting search they will be given a list of postings that are within their search criteria. 

If users select Create Posting, they will be redirected to a new page where they will create an activity posting. 

#### Creating a Post

If users elect to create a posting for an activity upon redirection to the creation page they will be required to provide the following information: 

- Posting Title
- Activity (Must be within available tags for search purposes)
- Day/Time (From current day to two weeks)
- Location (Saved favorite location, dropped pin, or custom address)
- Age Range
- Minimum Participants (Optional)
- Maximum Participants (Optional)
- Opt in to Activity Chat, an event will have a specific chat for that event, regardless of whether or not the post creator opts-in, that is only available to RSVP'd members who also opted-in upon RSVP. All activity chats are closed 12-hours after the scheduled end-time of the activity.
- A description that the user may write for the posting. 
- Posting visibility (Men/Women/Anyone) This will be visibile on the posting board. 

Postings have different visibility rules that user discovery. Activity visibility does not modify direct messaging permissions.
 
 If the posting is visible to all, regardless of the visibility settings of the user, all other users may see the posting, and the profile of the posting user may be viewed by anyone. This does not grant or change Direct Message permissions. Only viewing while the posting is active. If the posting is for men or women only, only users who match visibility settings may view the post. 

Examples: 
- Man who is seeking men makes a posting for anyone. Women may view his profile and RSVP. They still cannot DM him under any circumstance. The activity opt-in chat is they only place where in-app communication is permitted.
- Man who is seeking men makes a posting for men, only men who are seeking men/anyone may see and interact with the posting.
- Man who is seeking men makes a posting for women, only women are seeking men/anyone may see and interact with the posting. 

#### Viewing a Post

When a user elects to click on a specific posting they will be redirected to the post-view page. On this page users will see the following information:

- Posting title
- Posting Visibility: Men/Women/Anyone
- Profile picture/name of who made the posting
- Location 
- Day/Time
- Participants: Current / Max Range (if given, otherwise just current)
- Age Range
- Description
- Current RSVP list

Beneath the displayed information will be a button to RSVP to post. 

#### RSVPing to a Post

If users elect to RSVP to a posting, they will be given a pop up window with some warnings/selections. 

Firstly, the window will display a disclaimer message to the user: By RSVPing to an event some users may be able to see your profile despite your visibility preferences. This does not affect direct messaging protections in any way. 

Below the disclaimer will be a confirmation question with relevant information to the posting: Would you to confirm your rsvp to [Post Name] at [Post location] at [Post Day/Time]? 

The user with then be given an option to check: Opt-in to activity chat? It is unchecked by default.

Lastly, in the window will be a confirmation button that confirms the user to the RSVP list of the activity posting, and enters the user into the activity chat or not, depending on opt-in selection

## Safety Features

The V1 release will support basic admin as safety features such as: 

- Report User
- Block User
- Ban User 

## Technical Development Stack

### Mobile Application
- React Native
- TypeScript

### Backend

- Ruby on Rails API

### Database

- PostgreSQL

## Current Roadmap Objectives

### V1 - Product Viability Assessment
- User Profiles
- User Discovery
- Activity Posting
- Activity Joining
- Messaging/Activity Chat
- Safety Systems

### V2 - Revenue Validation 

Potential Features: 

- Localization
- Website
- Advertising
- Subscription Options
- User feedback features

### V3 - Platform Expansion

Potential Features: 

- 3D map functionality
- Paid Teams
- Team Logo creator
- Turf-war mechanics
- User feedback features

## Success Criteria for V1

V1 will be considered successful if users are able to: 
- Create profiles
- Discover other users
- Create activity postings 
- RSVP to activities
- Participate in activity chats
- Coordinate real-world activities

without requiring direct administrative intervention.

Additionally, success criteria is dependent upon if users demonstrate repeat engagement with activity creation, activity participation, and user discovery features.

### Scope Philosophy
V1 exists to validate whether users are willing to create profiles, discover activities, communicate, and coordinate real-world meetups. Features that do not directly contribute to validating this core user flow are intentionally excluded.

#### Out of Scope for V1
- Detailed recurring availability schedules.
    - Users will not be able to input full weekly schedules or utilize automated mass-matching based on recurring availability.
- 3D Map/Map interfacing for searching/finding people.
    - Thinking more in the scope of V3, where we introduce teams/turf-wars. 
- Monetization of any kind.
    - The first monetary introductions will be considered in V2 upon review of deployment performance. 
- Teams/Turf-Wars.
    - While the genesis idea of the app, this is a large host of features that requires an existing base to be functional. 
- Localization.
    - V1 will include preparation for localization in V2, however it will only support english considering scope creep. 
- Persisting Group Chat or large group functionality.
    - V1 will only support temporary activity-based chats. Permanent group chats, communities, clubs, and organization-level communication are out of scope. 
- Social Feed/Friend Systems.
    - Not in scope for V1 or even currently. This turns the app towards an entire social media platform which may be necessary in the future but is not currently. 
- No media uploads of any kind beyond the profile picture.
    - This is mainly for user protection, regarding directing messaging. 
- Read receipts/Push notifications/Voice messages.
    - We want the communication between users in the app to be fairly barebones at first. While additional messaging features will indeed be valuable and necessary in the future they are not needed for current project requirements. 
- Recommendation Algorithms / AI Features.
    - Discovery will rely on direct user filtering rather than recommendation systems, matching algorithms, or AI-driven suggestions.
- Website-side functionality. 
    - A landing page will be created, however an entire functional website is going to add a large chunk of development to the process and I do not believe is necessary for V1.
- Advanced admin/moderation tools.
    - V1 will include basic block/report/ban functionality, but not a full moderation dashboard and automated appeal/review pipelines. 

## Current Status

Requirements gathering and V1 specification development.

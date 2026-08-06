import type { Profile } from '@/types/profile';
import type { MockUser } from '@/types/user';
import { calculateAge } from '@/utils/calculate-age';

export const currentUser: MockUser = {
  id: 6,
  email: 'riley.f@example.com',
  password: 'password123',
};

export const currentUserProfile: Profile = {
  id: 6,
  userId: 6,
  firstName: 'Riley',
  lastName: 'Fencl',
  dateOfBirth: '1994-05-11',
  sex: 'male',
  activities: ['Lifting', 'Running', 'Swimming'],
  preferredTimes: ['Morning', 'Evening'],
  visibilityPreferences: ['anyone'],
  aboutMe:
    'Avid lifter, interval trainer, and swimmer. I stick to an upper/lower split and my cardio is all interval training. Looking for a training partner, prefabaly a newer lifter.',
};

export const currentUserSex = currentUserProfile.sex;
export const currentUserAge = calculateAge(currentUserProfile.dateOfBirth);
export const currentUserActivities = currentUserProfile.activities;
export const currentUserTimes = currentUserProfile.preferredTimes;
export const currentUserVisibilityPreferences =
  currentUserProfile.visibilityPreferences;

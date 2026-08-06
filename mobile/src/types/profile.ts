import type { Sex, VisibilityPreference } from '@/types/sex';

export type Profile = {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: Sex;
  activities: string[];
  preferredTimes: string[];
  distanceMiles?: number;
  visibilityPreferences: VisibilityPreference[];
  aboutMe?: string;
  matchCount?: number;
};
import type { Sex, VisibilityPreference } from '@/types/sex';

export type Profile = {
  id: string;
  firstName: string;
  lastInitial: string;
  age: number;
  sex: Sex;
  activities: string[];
  preferredTimes: string[];
  distanceMiles?: number;
  visibilityPreferences: VisibilityPreference[];
  aboutMe?: string;
  matchCount?: number;
};
import type { VisibilityPreference } from '@/types/sex';
import type { Profile } from './profile';

export type Posting = {
  id: string;
  title: string;
  activity: string;
  dateTime: Date;
  distanceMiles: number;
  locationName: string;
  description?: string;
  creator: Profile;
  participants: Profile[];
  maxParticipants: number | null;
  visibility: VisibilityPreference[];
  ageRange: {
    min: number;
    max: number;
  };
};

export type CreatePostingPayload = {
  title: string;
  activity: string;
  dateTime: Date;
  locationName: string;
  visibility: VisibilityPreference[];
  ageRange: {
    min: number;
    max: number;
  };
  maxParticipants: number | null;
  description: string | null;
};
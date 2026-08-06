import type { VisibilityPreference } from '@/types/sex';
import type { Profile } from './profile';

export type Posting = {
  id: number;
  title: string;
  activity: string;
  dateTime: Date;
  distanceMiles?: number;
  locationName: string;
  description?: string;
  creator: Profile;
  participants: Profile[];
  participantCount?: number;
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
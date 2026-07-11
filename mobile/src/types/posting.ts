import type { VisibilityPreference } from '@/types/sex';

export type Posting = {
  id: string;
  title: string;
  activity: string;
  dateTime: Date;
  distanceMiles: number;
  currentParticipants: number;
  maxParticipants: number | null;
  visibility: VisibilityPreference[];
  ageRange: {
    min: number;
    max: number;
  };
};
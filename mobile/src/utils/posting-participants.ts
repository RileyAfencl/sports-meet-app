import type { Posting } from '@/types/posting';

/** Total headcount including creator — matches API participantCount */
export function getParticipantCount(posting: Posting): number {
  return posting.participantCount ?? posting.participants.length + 1;
}

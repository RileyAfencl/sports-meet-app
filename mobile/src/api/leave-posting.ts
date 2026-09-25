import { API_BASE_URL } from '@/constants/api';
import type { Posting } from '@/types/posting';

import { parsePosting, type PostingJson } from '@/api/search-postings';

/** Matches POST /api/postings/:id/leave on Api::PostingsController#leave */
export type LeavePostingRequest = {
  postingId: number;
};

type LeavePostingResponse = {
  posting: PostingJson;
};

export async function leavePosting(
  request: LeavePostingRequest
): Promise<Posting> {
  const response = await fetch(
    `${API_BASE_URL}/api/postings/${request.postingId}/leave`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = Array.isArray(body.errors)
      ? body.errors.join(', ')
      : 'Leave failed';
    throw new Error(message);
  }

  const data = body as LeavePostingResponse;
  return parsePosting(data.posting);
}

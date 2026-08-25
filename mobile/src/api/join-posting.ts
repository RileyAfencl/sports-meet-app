import { API_BASE_URL } from '@/constants/api';
import type { Posting } from '@/types/posting';

import { parsePosting, type PostingJson } from '@/api/search-postings';

/** Matches the snake_case body Rails expects in Api::PostingsController#join */
export type JoinPostingRequest = {
  postingId: number;
  join_chat: boolean;
};

type JoinPostingResponse = {
  posting: PostingJson;
};

export async function joinPosting(
  request: JoinPostingRequest
): Promise<Posting> {
  const response = await fetch(
    `${API_BASE_URL}/api/postings/${request.postingId}/join`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ join_chat: request.join_chat }),
    }
  );

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = Array.isArray(body.errors)
      ? body.errors.join(', ')
      : 'Join failed';
    throw new Error(message);
  }

  const data = body as JoinPostingResponse;
  return parsePosting(data.posting);
}

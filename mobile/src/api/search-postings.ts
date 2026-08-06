import { API_BASE_URL } from '@/constants/api';
import type { Posting } from '@/types/posting';

/** Matches the snake_case body Rails expects in Api::PostingsController#search */
export type SearchPostingsRequest = {
  activities: string[];
  radius_miles: number;
  date_range: {
    start: string;
    end: string;
  };
};

/** Raw posting from JSON — only dateTime differs (ISO string vs Date) */
type PostingJson = Omit<Posting, 'dateTime'> & {
  dateTime: string;
};

type SearchPostingsResponse = {
  postings: PostingJson[];
};

function parsePosting(raw: PostingJson): Posting {
  return {
    ...raw,
    dateTime: new Date(raw.dateTime),
  };
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/** Builds ISO date strings for the API when the user hasn't picked dates in the UI */
export function buildSearchDateRange(
  startDate: Date | null,
  endDate: Date | null
): SearchPostingsRequest['date_range'] {
  const start = startDate ?? new Date();
  const end = endDate ?? addDays(start, 13);

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

export async function searchPostings(
  request: SearchPostingsRequest
): Promise<Posting[]> {
  const response = await fetch(`${API_BASE_URL}/api/postings/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = Array.isArray(body.errors)
      ? body.errors.join(', ')
      : 'Search failed';
    throw new Error(message);
  }

  const data = body as SearchPostingsResponse;
  return data.postings.map(parsePosting);
}

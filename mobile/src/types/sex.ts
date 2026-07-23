export type Sex = 'male' | 'female' | 'other';

export type VisibilityPreference = Sex | 'anyone';

export const sexOptions: Sex[] = [
  'male',
  'female',
  'other',
];

export const postingVisibilityOptions: VisibilityPreference[] = [
  'anyone',
  'male',
  'female',
  'other',
];

export const sexLabels: Record<Sex, string> = {
  male: 'Male',
  female: 'Female',
  other: 'Other',
};

export const postingVisibilityLabels: Record<
  VisibilityPreference,
  string
> = {
  male: 'Men',
  female: 'Women',
  other: 'Other',
  anyone: 'Anyone',
};

export const sexInitials: Record<Sex, string> = {
  male: 'M',
  female: 'F',
  other: 'O',
};
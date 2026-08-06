/**
 * Matches Profile#age in the Rails backend.
 * Expects dateOfBirth as "YYYY-MM-DD" (Rails date column / ISO date string).
 */
export function calculateAge(dateOfBirth: string): number {
  const [year, month, day] = dateOfBirth.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const birthdayHasNotOccurred =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate());

  if (birthdayHasNotOccurred) {
    age -= 1;
  }

  return age;
}

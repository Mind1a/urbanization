// API publication dates are calendar dates without a timezone. Reading their
// components directly keeps server and browser output identical in every locale.
export function formatCalendarDate(value: string) {
  const parts = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  return parts ? `${parts[3]}.${parts[2]}.${parts[1]}` : value;
}

/**
 * 
 * @param start start date of the visit (Date object or ISO string)
 * @param end end date of the visit
 * @returns the current day of the visit
 */
export function currentDay(start: string): number {
  // The number of milliseconds in one day
  const oneDay = 1000 * 60 * 60 * 24;
  const now = new Date();
  
  // Convert string to Date
  const startDate = new Date(start);

  // Convert both dates to UTC timestamps to avoid timezone issues
  const date1_ms = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const date2_ms = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  // Calculate the difference in milliseconds
  const difference_ms = Math.abs(date2_ms - date1_ms);

  // Convert the difference to days and return
  return Math.floor(difference_ms / oneDay) + 1;
}

export function getDaysLength(start: Date, end: Date): number {
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

export function formatDateRange(startStr: string, endStr: string): string {
  const start = new Date(startStr + 'T00:00:00')
  const end = new Date(endStr + 'T00:00:00')
  const startPart = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const endPart = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return `${startPart} - ${endPart}`
}

export const MILLIS_IN_DAY = 1000 * 60 * 60 * 24;
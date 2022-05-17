const diffDates = (date, otherDate) => date - otherDate;

export function getCurrentWeekNumber() {
  const currentDate = new Date();
  const jan1st = new Date(currentDate.getFullYear(), 0, 1);
  const numberOfDays = Math.floor(
    diffDates(currentDate, jan1st) / (24 * 60 * 60 * 1000)
  );
  const currentWeekNumber = Math.ceil(
    (currentDate.getDay() + numberOfDays) / 7
  );

  return currentWeekNumber;
}

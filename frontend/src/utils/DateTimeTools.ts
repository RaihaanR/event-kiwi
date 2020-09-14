const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const abrevDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const abrevMonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

export const getLongDate = (date: Date) => {
  return (
    `${date.getDate()} ${months[date.getMonth()]}`
  )
}

export const getFullDate = (date: Date) => {
  return (
    `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  )
}

export const getTime = (date: Date) => {
  return (
    `${date.toLocaleTimeString().substring(0, 5)}`
  )
}

export const getShortDate = (date: Date) => {
  return (
    `${date.getDate()} ${abrevMonths[date.getMonth()]}`
  )
}

export const getNumDate = (date: Date) => (
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
)

export const sameDay = (date1: Date, date2: Date) => {
  return (
    date1.getUTCDate() === date2.getUTCDate()) &&
      (date1.getUTCMonth() === date2.getUTCMonth()) &&
      (date1.getUTCFullYear() === date2.getUTCFullYear()
  )
}

export const getDateRange = (dateStart: Date, dateEnd: Date) => {
  return (
    `${getShortDate(dateStart)}, ${getTime(dateStart)} — ${(!sameDay(dateStart, dateEnd) ? getShortDate(dateEnd) + ", " : "") + getTime(dateEnd)}`
  )
}

export const getDateRangeNoStartDate = (dateStart: Date, dateEnd: Date) => {
  return (
    `${getTime(dateStart)} — ${(!sameDay(dateStart, dateEnd) ? getShortDate(dateEnd) + ", " : "") + getTime(dateEnd)}`
  )
}
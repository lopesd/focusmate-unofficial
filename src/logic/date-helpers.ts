const DAY_OF_WEEK_MAP: { [key: number]: string | undefined } = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat'
}

export function simpleTimeFormat(date: Date) {
  let hours = date.getHours()
  const ampm = hours >= 12 ? 'p' : 'a'
  hours = hours % 12
  const hoursStr = hours !== 0 ? hours.toString() : '12' // the hour '0' should be '12'

  const minutes = date.getMinutes()
  let minutesString = minutes === 0 ? '' : minutes < 10 ? `:0${minutes}` : `:${minutes}`
  return `${hoursStr}${minutesString}${ampm}`
}

export function simpleDayFormat(date: Date) {
  return `${dayOfWeekNumberToStr(date.getDay())} ${date.getMonth()+1}/${date.getDate()}`
}

export function dayOfWeekNumberToStr(dayOfWeek: number) {
  const str = DAY_OF_WEEK_MAP[dayOfWeek]
  if (str) {
    return str
  }
  throw `${dayOfWeek} is not a valid day of the week`
}
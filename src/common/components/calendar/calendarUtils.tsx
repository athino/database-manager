

export const parseYearMonthDate = (arg: {
  year: number
  month: number
  date: number
}) => {

  try {
    const date = new Date(0)
    const indexMonth = arg.month - 1

    date.setUTCHours(0, 0, 0, 0)
    date.setUTCFullYear(arg.year)
    date.setUTCMonth(indexMonth)
    date.setUTCDate(arg.date)
  
    if (date.getUTCFullYear() !== arg.year) { throw new Error() }
    if (date.getUTCMonth() !== indexMonth) { throw new Error() }
    if (date.getUTCDate() !== arg.date) { throw new Error() }

    date.setUTCMonth(date.getUTCMonth() + 1)
    date.setUTCDate(0)

    const endDate = date.getUTCDate()

    date.setUTCDate(1)

    const startDate = date.getUTCDate()
    const startWeekdayIndex = date.getUTCDay()

    const count = Math.ceil((startWeekdayIndex + endDate) / 7) * 7

    const ef = [...Array(count)].map(() => {
      return {
        inMonth: false
      }
    })
    
    return ef
  } catch (error) {
    return []
  }

}
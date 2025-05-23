const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

export function formatDate(date: string) {
  const [month, day, year] = date.split('/')
  const monthName = months[parseInt(month, 10) - 1]
  return `${day} ${monthName}`
}

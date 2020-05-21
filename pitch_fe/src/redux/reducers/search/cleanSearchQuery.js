export const cleanSearchQuery = (searchQuery) => {
  let trimQuery = searchQuery.trim().toLowerCase()
  if (!searchQuery.includes('atm') && !searchQuery.includes('bank')) {
    trimQuery += ' bank'
  }
  return trimQuery
}

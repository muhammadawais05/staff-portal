export default (warningLevel?: string) => {
  switch (warningLevel) {
    case 'high':
      return 'red'
    case 'medium':
      return 'yellow'
    case 'low':
      return 'green'
  }

  return 'dark-grey'
}

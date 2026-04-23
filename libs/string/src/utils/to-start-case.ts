export const toStartCase = (text: string) =>
  text
    .split(' ')
    .map(word => word[0].toUpperCase() + word.substr(1).toLowerCase())
    .join(' ')

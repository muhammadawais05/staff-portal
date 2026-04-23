export const pascalToCamelCase = (str: string) =>
  str[0].toLowerCase() + str.slice(1)

/**
 * Replaces variable name with a human label
 * ex. 'pending_talent_reason' -> 'pending talent reason'
 */
export const humanize = (str: string) => str.replace(/_/g, ' ')

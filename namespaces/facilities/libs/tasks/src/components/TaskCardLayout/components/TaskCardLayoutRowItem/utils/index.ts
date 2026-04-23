import { ReactNode } from 'react'

// This helper method checks multiple possible cases
// to check if a variable has a content to display
export const hasContent = (value: ReactNode | undefined): boolean => {
  if (typeof value === 'number') {
    return true
  }

  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  if (typeof value === 'boolean') {
    return value
  }

  return !!value
}

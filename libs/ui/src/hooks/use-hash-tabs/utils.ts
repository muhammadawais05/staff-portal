import { HashTabConfig } from '@staff-portal/routes'
import { extractModalHash } from '@staff-portal/utils'

export const getActiveTabIndex = (
  hash: string,
  tabs: HashTabConfig[]
): number => {
  const foundIndex = tabs.findIndex(({ tabHash }) => {
    const modalHash = extractModalHash(hash)

    const currentHash = modalHash ? hash.replace(modalHash, '') : hash

    return (Array.isArray(tabHash) ? tabHash : [tabHash]).some(
      value => `#${value}` === currentHash
    )
  })

  if (foundIndex !== -1) {
    return foundIndex
  }

  return 0
}

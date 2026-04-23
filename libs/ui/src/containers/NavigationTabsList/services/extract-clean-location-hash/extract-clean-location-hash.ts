import { extractModalHash } from '@staff-portal/utils'

export const extractCleanLocationHash = (hash: string | undefined) => {
  if (!hash) {
    return null
  }

  const modalHash = extractModalHash(hash)
  const currentHash = modalHash ? hash.replace(modalHash, '') : hash

  return currentHash.replace('#', '')
}

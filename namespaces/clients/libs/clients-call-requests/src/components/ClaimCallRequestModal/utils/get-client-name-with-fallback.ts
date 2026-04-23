import { FALLBACK_CLIENT_NAME } from '../../../config'

export const getClientNameWithFallback = (name?: string | null) =>
  name || FALLBACK_CLIENT_NAME

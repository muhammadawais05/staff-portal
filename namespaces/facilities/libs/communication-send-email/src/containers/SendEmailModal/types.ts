import type { EmailMessagingFragment } from './data/fragments'

export type EmailContext = EmailMessagingFragment & {
  defaultBookingObject?: {
    id: string
    name?: string | null
  }
}

export type ContactCompanyPayload = {
  refetchTasks: boolean
}

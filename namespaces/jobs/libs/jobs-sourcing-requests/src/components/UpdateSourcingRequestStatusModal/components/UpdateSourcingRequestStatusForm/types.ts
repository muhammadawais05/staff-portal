import { SourcingRequestStatus } from '@staff-portal/graphql/staff'

export type FormValues = {
  status: SourcingRequestStatus
  comment: string
}

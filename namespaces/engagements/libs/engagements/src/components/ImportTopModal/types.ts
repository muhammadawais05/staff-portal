import type { ImportTopInput } from '@staff-portal/graphql/staff'

export type ImportTopForm = Omit<
  ImportTopInput,
  'clientMutationId' | 'engagementId' | 'number'
> & {
  number: string
}

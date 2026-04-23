import { Client } from '@staff-portal/graphql/staff'

export type Company = {
  id: Client['id']
  contact?: { id: string } | null
}

import { Maybe } from '@staff-portal/graphql/staff'
export interface TagItem {
  id: string
  name: string
  experience?: Maybe<number> | undefined
}

import { Maybe } from '@staff-portal/graphql/staff'
export interface ProfileSkill {
  id: string
  experience?: Maybe<number> | undefined
  skill: {
    id: string
    name: string
  }
}

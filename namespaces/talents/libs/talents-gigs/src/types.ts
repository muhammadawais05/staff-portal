import {
  PublicationGigStatus,
  P2PRequestStatus
} from '@staff-portal/graphql/staff'

export type PublicationGigType = {
  id: string
  description: string
  skills: string[]
  status: PublicationGigStatus | P2PRequestStatus
  title: string
}

const hasKey = <K extends string>(
  key: K,
  object: {}
): object is { [_ in K]: unknown } => {
  return typeof object === 'object' && key in object
}

export const hasTypeName = (val: {}): val is { __typename: string } => {
  return hasKey('__typename', val) && typeof val.__typename === 'string'
}

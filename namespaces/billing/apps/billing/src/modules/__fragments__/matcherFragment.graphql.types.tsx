/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { StaffFragment } from './staffFragment.graphql.types'
import { gql } from '@apollo/client'
import { StaffFragmentDoc } from './staffFragment.graphql.types'
export type MatcherFragment = {
  nodes: Array<{
    id: string
    role: StaffFragment
    vertical: { id: string; talentType: string }
  }>
}

export const MatcherFragmentDoc = gql`
  fragment MatcherFragment on ClientMatcherConnection {
    nodes {
      id
      role {
        ...StaffFragment
      }
      vertical {
        id
        talentType
      }
    }
  }
  ${StaffFragmentDoc}
`

/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { gql } from '@apollo/client'
export type FeedbackReasonFragment = {
  id: string
  identifier: string
  name: string
}

export const FeedbackReasonFragmentDoc = gql`
  fragment FeedbackReasonFragment on FeedbackReason {
    id
    identifier
    name
  }
`

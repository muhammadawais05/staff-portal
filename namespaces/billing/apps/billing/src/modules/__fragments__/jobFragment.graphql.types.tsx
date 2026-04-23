/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { FeedbackReasonFragment } from './feedbackReasonFragment.graphql.types'
import { WebResourceFragment } from '../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { FeedbackReasonFragmentDoc } from './feedbackReasonFragment.graphql.types'
import { WebResourceFragmentDoc } from '../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
export type JobFragment = {
  cumulativeStatus?: Types.Maybe<Types.CumulativeJobStatus>
  hiredCount?: Types.Maybe<number>
  id: string
  matcherCallScheduled?: Types.Maybe<boolean>
  status?: Types.Maybe<Types.JobStatus>
  talentCount?: Types.Maybe<number>
  title: string
  currentInvestigation?: Types.Maybe<{
    startedAt:
      | `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}`
      | ''
  }>
  engagementEndedFeedbackReason?: Types.Maybe<FeedbackReasonFragment>
  webResource: WebResourceFragment
}

export const JobFragmentDoc = gql`
  fragment JobFragment on Job {
    cumulativeStatus
    currentInvestigation {
      startedAt
    }
    engagementEndedFeedbackReason {
      ...FeedbackReasonFragment
    }
    hiredCount
    id
    matcherCallScheduled
    status
    talentCount
    title
    webResource {
      ...WebResourceFragment
    }
  }
  ${FeedbackReasonFragmentDoc}
  ${WebResourceFragmentDoc}
`

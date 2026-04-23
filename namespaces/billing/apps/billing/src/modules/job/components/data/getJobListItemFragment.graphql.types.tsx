/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { WebResourceFragment } from '../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { WebResourceFragmentDoc } from '../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
export type GetJobListItemFragment = {
  id: string
  hiredCount?: Types.Maybe<number>
  matcherCallScheduled?: Types.Maybe<boolean>
  talentCount?: Types.Maybe<number>
  title: string
  status?: Types.Maybe<Types.JobStatus>
  cumulativeStatus?: Types.Maybe<Types.CumulativeJobStatus>
  currentInvestigation?: Types.Maybe<{
    id: string
    startedAt:
      | `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}`
      | ''
  }>
  engagements?: Types.Maybe<{
    totalCount: number
    nodes: Array<{
      id: string
      purchaseOrder?: Types.Maybe<{ id: string }>
      purchaseOrderLine?: Types.Maybe<{ id: string }>
      webResource: WebResourceFragment
    }>
  }>
  purchaseOrder?: Types.Maybe<{ id: string }>
  purchaseOrderLine?: Types.Maybe<{ id: string }>
  webResource: WebResourceFragment
}

export const GetJobListItemFragmentDoc = gql`
  fragment GetJobListItem on Job {
    id
    currentInvestigation {
      id
      startedAt
    }
    hiredCount
    matcherCallScheduled
    talentCount
    engagements {
      nodes {
        id
        purchaseOrder {
          id
        }
        purchaseOrderLine {
          id
        }
        webResource {
          ...WebResourceFragment
        }
      }
      totalCount
    }
    title
    status
    cumulativeStatus
    purchaseOrder {
      id
    }
    purchaseOrderLine {
      id
    }
    webResource {
      ...WebResourceFragment
    }
  }
  ${WebResourceFragmentDoc}
`

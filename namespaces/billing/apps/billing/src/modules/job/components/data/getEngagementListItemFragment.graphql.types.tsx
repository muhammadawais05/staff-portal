/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { WebResourceFragment } from '../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { GetJobListItemFragment } from './getJobListItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { WebResourceFragmentDoc } from '../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { GetJobListItemFragmentDoc } from './getJobListItemFragment.graphql.types'
export type GetEngagementListItemFragment = {
  id: string
  purchaseOrder?: Types.Maybe<{ id: string }>
  purchaseOrderLine?: Types.Maybe<{ id: string }>
  webResource: WebResourceFragment
  job?: Types.Maybe<GetJobListItemFragment>
}

export const GetEngagementListItemFragmentDoc = gql`
  fragment GetEngagementListItem on Engagement {
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
    job {
      ...GetJobListItem
    }
  }
  ${WebResourceFragmentDoc}
  ${GetJobListItemFragmentDoc}
`

/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { WebResourceFragment } from '../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { WebResourceFragmentDoc } from '../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
export type PurchaseOrderListItemFragment = {
  archived: boolean
  budgetLeft?: Types.Maybe<string>
  budgetSpent: boolean
  id: string
  invoicedAmount: string
  draftedAmount: string
  poNumber: string
  threshold?: Types.Maybe<string>
  totalAmount?: Types.Maybe<string>
  client: { webResource: WebResourceFragment }
  webResource: WebResourceFragment
}

export const PurchaseOrderListItemFragmentDoc = gql`
  fragment PurchaseOrderListItemFragment on PurchaseOrder {
    archived
    budgetLeft
    budgetSpent
    client {
      webResource {
        ...WebResourceFragment
      }
    }
    id
    invoicedAmount
    draftedAmount
    poNumber
    threshold
    totalAmount
    webResource {
      ...WebResourceFragment
    }
  }
  ${WebResourceFragmentDoc}
`

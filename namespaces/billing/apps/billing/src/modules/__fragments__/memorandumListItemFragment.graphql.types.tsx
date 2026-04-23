/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { MemorandumItemFragment } from '../../../../../libs/billing-widgets/src/modules/__fragments__/memorandumFragment.graphql.types'
import { WebResourceFragment } from '../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { MemorandumItemFragmentDoc } from '../../../../../libs/billing-widgets/src/modules/__fragments__/memorandumFragment.graphql.types'
import { WebResourceFragmentDoc } from '../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
export type MemorandumListItemFragment = {
  createdOn: `${`${number}-${number}-${number}`}` | ''
  receiver:
    | {
        __typename: 'Client'
        id: string
        fullName: string
        webResource: WebResourceFragment
      }
    | {
        __typename: 'CompanyRepresentative'
        id: string
        fullName: string
        webResource: WebResourceFragment
      }
    | {
        __typename: 'Leader'
        id: string
        fullName: string
        webResource: WebResourceFragment
      }
    | {
        __typename: 'ReferralPartner'
        id: string
        fullName: string
        webResource: WebResourceFragment
      }
    | {
        __typename: 'Staff'
        id: string
        fullName: string
        webResource: WebResourceFragment
      }
    | {
        __typename: 'Talent'
        id: string
        fullName: string
        webResource: WebResourceFragment
      }
    | {
        __typename: 'TalentPartner'
        id: string
        fullName: string
        webResource: WebResourceFragment
      }
} & MemorandumItemFragment

export const MemorandumListItemFragmentDoc = gql`
  fragment MemorandumListItemFragment on Memorandum {
    ...MemorandumItem
    createdOn
    receiver {
      __typename
      ... on Client {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
      ... on CompanyRepresentative {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
      ... on Leader {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
      ... on ReferralPartner {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
      ... on Staff {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
      ... on Talent {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
      ... on TalentPartner {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }
  ${MemorandumItemFragmentDoc}
  ${WebResourceFragmentDoc}
`

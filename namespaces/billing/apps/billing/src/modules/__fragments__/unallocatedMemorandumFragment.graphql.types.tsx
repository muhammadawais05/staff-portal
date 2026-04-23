/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { gql } from '@apollo/client'
export type UnallocatedMemorandumNodesFragment = {
  nodes: Array<UnallocatedMemorandumFragment>
}

export type UnallocatedMemorandumFragment = {
  id: string
  amountDue: string
  balance: Types.MemorandumBalance
  description: string
  number: number
}

export const UnallocatedMemorandumFragmentDoc = gql`
  fragment UnallocatedMemorandumFragment on Memorandum {
    id
    amountDue
    balance
    description
    number
  }
`
export const UnallocatedMemorandumNodesFragmentDoc = gql`
  fragment UnallocatedMemorandumNodesFragment on UnallocatedMemorandumConnection {
    nodes {
      ... on Memorandum {
        ...UnallocatedMemorandumFragment
      }
    }
  }
  ${UnallocatedMemorandumFragmentDoc}
`

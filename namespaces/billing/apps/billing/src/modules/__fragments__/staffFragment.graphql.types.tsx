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
export type StaffFragment = {
  id: string
  fullName: string
  webResource: WebResourceFragment
}

export const StaffFragmentDoc = gql`
  fragment StaffFragment on Staff {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
  }
  ${WebResourceFragmentDoc}
`

/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { gql } from '@apollo/client'
export type UserErrorFragment_AssignScreeningSpecialistsError_ = {
  code: string
  key: string
  message: string
}

export type UserErrorFragment_GraniteError_ = {
  code: string
  key: string
  message: string
}

export type UserErrorFragment_P2PStandardUserError_ = {
  code: string
  key: string
  message: string
}

export type UserErrorFragment_SpecialistAssignmentBulkActionError_ = {
  code: string
  key: string
  message: string
}

export type UserErrorFragment_StandardUserError_ = {
  code: string
  key: string
  message: string
}

export type UserErrorFragment_TopcallUserError_ = {
  code: string
  key: string
  message: string
}

export type UserErrorFragment =
  | UserErrorFragment_AssignScreeningSpecialistsError_
  | UserErrorFragment_GraniteError_
  | UserErrorFragment_P2PStandardUserError_
  | UserErrorFragment_SpecialistAssignmentBulkActionError_
  | UserErrorFragment_StandardUserError_
  | UserErrorFragment_TopcallUserError_

export const UserErrorFragmentDoc = gql`
  fragment UserErrorFragment on UserError {
    code
    key
    message
  }
`

/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { gql } from '@apollo/client'
export type PaymentSubjectNameFragment_Client_ = { fullName: string }

export type PaymentSubjectNameFragment_CompanyRepresentative_ = {
  fullName: string
}

export type PaymentSubjectNameFragment_Leader_ = { fullName: string }

export type PaymentSubjectNameFragment_ReferralPartner_ = { fullName: string }

export type PaymentSubjectNameFragment_Staff_ = { fullName: string }

export type PaymentSubjectNameFragment_Talent_ = { fullName: string }

export type PaymentSubjectNameFragment_TalentPartner_ = { fullName: string }

export type PaymentSubjectNameFragment =
  | PaymentSubjectNameFragment_Client_
  | PaymentSubjectNameFragment_CompanyRepresentative_
  | PaymentSubjectNameFragment_Leader_
  | PaymentSubjectNameFragment_ReferralPartner_
  | PaymentSubjectNameFragment_Staff_
  | PaymentSubjectNameFragment_Talent_
  | PaymentSubjectNameFragment_TalentPartner_

export const PaymentSubjectNameFragmentDoc = gql`
  fragment PaymentSubjectNameFragment on PaymentSubject {
    ... on Client {
      fullName
    }
    ... on CompanyRepresentative {
      fullName
    }
    ... on Leader {
      fullName
    }
    ... on ReferralPartner {
      fullName
    }
    ... on Staff {
      fullName
    }
    ... on Talent {
      fullName
    }
    ... on TalentPartner {
      fullName
    }
  }
`

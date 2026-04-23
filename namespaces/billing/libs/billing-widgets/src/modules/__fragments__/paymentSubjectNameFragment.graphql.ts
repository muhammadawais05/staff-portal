import { gql } from '@apollo/client'

export const paymentSubjectNameFragment = gql`
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

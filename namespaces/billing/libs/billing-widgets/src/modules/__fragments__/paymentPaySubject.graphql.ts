import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

import { billingOptionFragment } from './billingOptionFragment.graphql'

export const payPaymentSubject = gql`
  fragment PaymentPaySubject on PaymentSubject {
    ... on Client {
      billingNotes
      # Temporary rename
      # https://github.com/toptal/platform/pull/45426/files
      paymentOptions: paymentOptionsNullable {
        ...PaymentOptionsConnectionFragment
      }
      id
      webResource {
        ...WebResourceFragment
      }
    }
    ... on CompanyRepresentative {
      billingNotes
      # Temporary rename
      # https://github.com/toptal/platform/pull/45426/files
      paymentOptions: paymentOptionsNullable {
        ...PaymentOptionsConnectionFragment
      }
      id
      webResource {
        ...WebResourceFragment
      }
    }
    ... on Leader {
      billingNotes
      # Temporary rename
      # https://github.com/toptal/platform/pull/45426/files
      paymentOptions: paymentOptionsNullable {
        ...PaymentOptionsConnectionFragment
      }
      id
      webResource {
        ...WebResourceFragment
      }
    }
    ... on ReferralPartner {
      billingNotes
      # Temporary rename
      # https://github.com/toptal/platform/pull/45426/files
      paymentOptions: paymentOptionsNullable {
        ...PaymentOptionsConnectionFragment
      }
      id
      webResource {
        ...WebResourceFragment
      }
    }
    ... on Talent {
      billingNotes
      # Temporary rename
      # https://github.com/toptal/platform/pull/45426/files
      paymentOptions: paymentOptionsNullable {
        ...PaymentOptionsConnectionFragment
      }
      id
      webResource {
        ...WebResourceFragment
      }
    }
    ... on TalentPartner {
      billingNotes
      # Temporary rename
      # https://github.com/toptal/platform/pull/45426/files
      paymentOptions: paymentOptionsNullable {
        ...PaymentOptionsConnectionFragment
      }
      id
      webResource {
        ...WebResourceFragment
      }
    }
    ... on Staff {
      billingNotes
      # Temporary rename
      # https://github.com/toptal/platform/pull/45426/files
      paymentOptions: paymentOptionsNullable {
        ...PaymentOptionsConnectionFragment
      }
      id
      webResource {
        ...WebResourceFragment
      }
    }
  }

  fragment PaymentOptionFragment on PaymentOption {
    accountInfo {
      label
      value
    }
    paymentMethod
    placeholder
    preferred
  }

  fragment PaymentOptionsConnectionFragment on PaymentOptionsConnection {
    nodes {
      ...PaymentOptionFragment
    }
  }

  ${billingOptionFragment}
  ${webResourceFragment}
`

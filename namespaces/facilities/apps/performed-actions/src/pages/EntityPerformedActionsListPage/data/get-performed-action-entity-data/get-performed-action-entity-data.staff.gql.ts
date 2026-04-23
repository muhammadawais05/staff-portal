import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetPerformedActionEntityData($entityId: ID!) {
    node(id: $entityId) {
      ... on Client {
        id
        viewerCanViewHistory
      }

      ... on CompanyRepresentative {
        id
        viewerCanViewHistory
      }

      ... on Invoice {
        id
        viewerCanViewHistory
      }

      ... on Job {
        id
        viewerCanViewHistory
      }

      ... on Leader {
        id
        viewerCanViewHistory
      }

      ... on OperationalIssue {
        id
        viewerCanViewHistory
      }

      ... on Opportunity {
        id
        viewerCanViewHistory
      }

      ... on Payment {
        id
        viewerCanViewHistory
      }

      ... on PaymentGroup {
        id
        viewerCanViewHistory
      }

      ... on Staff {
        id
        viewerCanViewHistory
      }

      ... on Talent {
        id
        viewerCanViewHistory
      }

      ... on TalentPartner {
        id
        viewerCanViewHistory
      }

      ... on ReferralPartner {
        id
        viewerCanViewHistory
      }

      ... on StaffAbility {
        id
        viewerCanViewHistory
      }
    }
  }
`

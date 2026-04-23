import { gql } from '@staff-portal/data-layer-service'

export const TALENT_REPEATED_CLIENTS_FRAGMENT = gql`
  fragment TalentRepeatedClientsFragment on Talent {
    id
    engagements {
      counters {
        clientsNumber
        repeatedClientsNumber
      }
    }
  }
`

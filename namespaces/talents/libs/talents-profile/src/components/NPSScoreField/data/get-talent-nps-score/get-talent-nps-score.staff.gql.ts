import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentNpsScoreDocument } from './get-talent-nps-score.staff.gql.types'

export const GET_TALENT_NPS_SCORE = gql`
  query GetTalentNPSScore($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        lastAnsweredPromotion {
          score
          updatedAt
        }
        promotions(
          filter: { statuses: [ANSWERED] }
          pagination: { offset: 0, limit: 1 }
          order: { field: UPDATED_AT, direction: DESC }
        ) {
          webResource {
            text
            url
          }
        }
      }
    }
  }
`

export const useGetTalentNPSScore = (talentId: string) =>
  useQuery(GetTalentNpsScoreDocument, {
    variables: { talentId },
    fetchPolicy: 'cache-first'
  })

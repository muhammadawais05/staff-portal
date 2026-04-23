import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetTalentWebResourceDocument } from './get-talent-web-resource.staff.gql.types'

export const GET_TALENT_WEB_RESOURCE = gql`
  query GetTalentWebResource($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        webResource {
          url
        }
      }
    }
  }
`

export const useGetTalentWebResource = (talentId: string) =>
  useGetNode(GetTalentWebResourceDocument)({ talentId })

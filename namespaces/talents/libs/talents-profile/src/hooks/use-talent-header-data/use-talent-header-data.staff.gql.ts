import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { TALENT_PARTNER_FRAGMENT } from '@staff-portal/talents'

import { GetTalentHeaderDataDocument } from './use-talent-header-data.staff.gql.types'
import { TALENT_GENERAL_DATA_BATCH_KEY } from '../../config'

export const GET_TALENT_HEADER_DATA: typeof GetTalentHeaderDataDocument = gql`
  query GetTalentHeaderData($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        ...TalentHeaderFragment
        ...TalentPartnerFragment
      }
    }
  }

  fragment TalentHeaderFragment on Talent {
    id
    fullName
    photo {
      small
    }
  }

  ${TALENT_PARTNER_FRAGMENT}
`

export const useTalentHeaderData = ({
  talentId,
  onError
}: {
  talentId: string
  onError: () => void
}) =>
  useQuery(GET_TALENT_HEADER_DATA, {
    onError,
    variables: { talentId },
    context: { [BATCH_KEY]: TALENT_GENERAL_DATA_BATCH_KEY }
  })

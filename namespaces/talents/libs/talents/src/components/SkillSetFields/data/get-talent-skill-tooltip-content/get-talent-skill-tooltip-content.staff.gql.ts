import { gql } from '@staff-portal/data-layer-service'

import { TALENT_SKILL_SET_CONNECTIONS_FRAGMENT } from '../../../../data'

export default gql`
  query GetTalentSkillTooltipContent($skillSetId: ID!) {
    node(id: $skillSetId) {
      ...TalentSkillSetConnectionsFragment
    }
  }

  ${TALENT_SKILL_SET_CONNECTIONS_FRAGMENT}
`

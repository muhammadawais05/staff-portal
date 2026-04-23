import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetSkillsList($skillIds: [ID!]!) {
    staffNodes(ids: $skillIds) {
      ...SkillsListFragment
    }
  }
  fragment SkillsListFragment on Skill {
    id
    isIdentifier
    isIdentifierUnmarkable
    activeExplicitJobsCount
    activeExplicitTalentsCount
    activeImplicitJobsCount
    activeImplicitTalentsCount
    parent {
      id
      name
    }
    category {
      id
      title
      vertical {
        id
        talentType
      }
    }
  }
`

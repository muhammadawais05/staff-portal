import { MockedResponse } from '@staff-portal/data-layer-service'

import {
  GetSkillsVerticalsDocument,
  SkillWithVerticalFragment
} from './get-skills-verticals.staff.gql.types'

export const createGetSkillsVerticalsMock = (
  skillIds: string[],
  skillVerticals: SkillWithVerticalFragment[] = []
): MockedResponse => ({
  request: {
    query: GetSkillsVerticalsDocument,
    variables: {
      skillIds
    }
  },
  result: {
    data: {
      staffNodes: skillVerticals,
      __typename: 'Query'
    }
  }
})

export const createSkillWithVerticalFragment = (
  skillWithVertical: Partial<SkillWithVerticalFragment> = {}
) => ({
  id: 'VjEtU2tpbGwtMTM0MDQx',
  isIdentifier: false,
  parent: null,
  category: {
    id: 'VjEtU2tpbGxDYXRlZ29yeS0yOQ',
    title: 'Other',
    vertical: {
      id: 'VjEtVmVydGljYWwtMQ',
      talentType: 'developer',
      __typename: 'Vertical'
    },
    __typename: 'SkillCategory'
  },
  __typename: 'Skill',
  ...skillWithVertical
})

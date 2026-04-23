import { MockedResponse } from '@staff-portal/data-layer-service'

import { GetSkillPageSlugsListDocument } from './get-skill-page-slugs.staff.gql.types'

export const createGetSkillPageSlugsListMock = (
  skillPageSlugs: string[] = []
): MockedResponse => ({
  request: {
    query: GetSkillPageSlugsListDocument
  },
  result: {
    data: {
      skillPageSlugs: skillPageSlugs,
      __typename: 'Query'
    }
  }
})

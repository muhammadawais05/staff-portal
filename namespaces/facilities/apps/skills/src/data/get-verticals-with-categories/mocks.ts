import { MockedResponse } from '@staff-portal/data-layer-service'

import {
  GetVerticalsWithCategoriesDocument,
  VerticalWithSkillCategoriesFragment
} from './get-verticals-with-categories.staff.gql.types'

export const createGetVerticalsWithCategoriesMock = (
  verticals: VerticalWithSkillCategoriesFragment[] = [
    createVerticalWithSkillCategoriesMock()
  ]
): MockedResponse => ({
  request: {
    query: GetVerticalsWithCategoriesDocument
  },
  result: {
    data: {
      verticals: {
        nodes: verticals,
        __typename: 'VerticalConnection'
      },
      __typename: 'Query'
    }
  }
})

export const createVerticalSkillCategoryMock = (
  id = 'VjEtU2tpbGxDYXRlZ29yeS02MA',
  title = 'Other'
): VerticalWithSkillCategoriesFragment['skillCategories']['nodes'][0] & {
  __typename: string
} => ({
  id,
  title,
  __typename: 'SkillCategory'
})

export const createVerticalSkillCategoriesNodesMock = (
  nodes: VerticalWithSkillCategoriesFragment['skillCategories']['nodes'] = [
    createVerticalSkillCategoryMock()
  ]
): VerticalWithSkillCategoriesFragment['skillCategories'] & {
  __typename: string
} => ({
  nodes: nodes,
  __typename: 'SkillCategoryConnection'
})

export const createVerticalWithSkillCategoriesMock = (
  skillCategories: VerticalWithSkillCategoriesFragment['skillCategories'] = createVerticalSkillCategoriesNodesMock()
): VerticalWithSkillCategoriesFragment & { __typename: string } => ({
  id: 'VjEtVmVydGljYWwtMTAxMA',
  talentType: 'developer',
  skillCategories: skillCategories,
  __typename: 'Vertical'
})

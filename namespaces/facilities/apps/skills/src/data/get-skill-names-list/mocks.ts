import { MockedResponse } from '@staff-portal/data-layer-service'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER, PAGE_SIZE } from '../../config'
import {
  GetSkillNamesListDocument,
  SkillNamesListItemFragment,
  SkillNamesListItemOperationsFragment,
  SkillNamesListItemSkillFragment
} from './get-lazy-skill-names-list.staff.gql.types'

const DEFAULT_VARIABLES = {
  filter: {},
  order: {
    field: DEFAULT_SORT_FIELD,
    direction: DEFAULT_SORT_ORDER
  },
  pagination: {
    offset: 0,
    limit: PAGE_SIZE
  }
}

export const createGetSkillNamesListMock = (
  skillNames: SkillNamesListItemFragment[] = [],
  variables = DEFAULT_VARIABLES
): MockedResponse => ({
  request: {
    query: GetSkillNamesListDocument,
    variables
  },
  result: {
    data: {
      skillNames: {
        nodes: skillNames,
        totalCount: skillNames.length,
        __typename: 'SkillNameConnection'
      },
      __typename: 'Query'
    }
  }
})

const createSkillNamesListItemSkillFragmentVerticalMock = (
  vertical: Partial<
    SkillNamesListItemSkillFragment['category']['vertical']
  > = {}
): SkillNamesListItemSkillFragment['category']['vertical'] & {
  __typename: string
} => ({
  id: 'VjEtVmVydGljYWwtMQ',
  talentType: 'developer',
  __typename: 'Vertical',
  ...vertical
})

const createSkillNamesListItemSkillFragmentCategoryMock = (
  category: Partial<SkillNamesListItemSkillFragment['category']> = {}
): SkillNamesListItemSkillFragment['category'] & {
  __typename: string
} => ({
  id: 'VjEtU2tpbGxDYXRlZ29yeS0yOQ',
  title: 'Other',
  vertical: createSkillNamesListItemSkillFragmentVerticalMock(),
  __typename: 'SkillCategory',
  ...category
})

export const createSkillNamesListItemSkillFragmentMock = (
  skillFragment: Partial<SkillNamesListItemSkillFragment> = {}
): SkillNamesListItemSkillFragment & {
  __typename: string
} => ({
  id: 'VjEtU2tpbGwtMTM0MDQx',
  category: createSkillNamesListItemSkillFragmentCategoryMock(),
  __typename: 'Skill',
  ...skillFragment
})

export const createSkillNamesListItemOperationsFragmentMock = (
  skillNameOperations: Partial<SkillNamesListItemOperationsFragment> = {}
): SkillNamesListItemOperationsFragment & {
  __typename: string
} => ({
  cloneSkillName: createOperationMock(),
  removeSkillName: createOperationMock(),
  toggleCheckSkillName: createOperationMock(),
  updateSkillName: createOperationMock(),
  __typename: 'SkillNameOperations',
  ...skillNameOperations
})

export const createSkillNamesListItemFragmentMock = (
  skillNameFragment: Partial<SkillNamesListItemFragment> = {}
): SkillNamesListItemFragment & {
  __typename: string
} => ({
  id: 'VjEtU2tpbGxOYW1lLTkzNTIw',
  name: 'Rust',
  editorChecked: true,
  verticalChecked: true,
  skillPageSlug: '',
  operations: createSkillNamesListItemOperationsFragmentMock(),
  skills: [createSkillNamesListItemSkillFragmentMock()],
  __typename: 'SkillName',
  ...skillNameFragment
})

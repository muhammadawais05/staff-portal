import { SkillsListFragment } from './get-skills-list.staff.gql.types'

const createVerticalMock = (): SkillsListFragment['category']['vertical'] & {
  __typename: string
} => ({
  __typename: 'Vertical',
  id: 'VjEtVmVydGljYWwtMQ',
  talentType: 'developer'
})

const createCategoryWithVerticalMock = (
  vertical = createVerticalMock()
): SkillsListFragment['category'] & { __typename: string } => ({
  __typename: 'SkillCategory',
  id: 'VjEtU2tpbGxDYXRlZ29yeS0yOQ',
  title: 'Other',
  vertical: vertical
})

export const createSkillsListMock = (
  category = createCategoryWithVerticalMock()
): SkillsListFragment & { __typename: string } => ({
  __typename: 'Skill',
  activeExplicitJobsCount: 1,
  activeExplicitTalentsCount: 2,
  activeImplicitJobsCount: 3,
  activeImplicitTalentsCount: 4,
  category: category,
  id: 'VjEtU2tpbGwtMTU1MjI5',
  isIdentifier: false,
  isIdentifierUnmarkable: true,
  parent: null
})

import React, { ReactNode } from 'react'
import { render, screen, within } from '@testing-library/react'
import { SkillRating, VettedSkillResult } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import VettedSkillsFields from './VettedSkillsFields'
import { SkillSets } from '../SkillSetFields'

jest.mock(
  '../SkillSetFields/components/SkillSetSkeletonLoader/SkillSetSkeletonLoader',
  () => ({
    SkillSetSkeletonLoader: () => <div data-testid='loading' />
  })
)

jest.mock('../SkillSetFields/data/get-talent-skill-tooltip-content', () => ({
  useGetTalentSkillTooltipContent: () => ({
    loading: true
  })
}))

jest.mock('../SkillTag/SkillTag', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div>{name}</div>
}))

jest.mock('@staff-portal/ui/src/components/AsyncTooltipWrapper', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>
}))

const createSkill = (id: string, result: VettedSkillResult) => ({
  id,
  rating: SkillRating.EXPERT,
  main: false,
  connections: { totalCount: 0 },
  skill: {
    id,
    name: `'TEST_NAME' ${result}`,
    category: {
      id,
      title: 'TEST_TITLE'
    }
  },
  vettedResult: {
    result,
    createdAt: '2020-09-02T12:26:22.142Z'
  }
})

const confirmedExpertSkill = createSkill('1', VettedSkillResult.EXPERT)
const maybeExpertSkill = createSkill('2', VettedSkillResult.MAYBE)
const notExpertSkill = createSkill('3', VettedSkillResult.NO)
const disqualifiedSkill = createSkill('4', VettedSkillResult.DISQUALIFIED)
const notVettableSkill = createSkill('5', VettedSkillResult.NOT_VETTABLE)
const noSpecializationSkill = createSkill(
  '6',
  VettedSkillResult.NO_SPECIALIZATION
)

const skillSets: SkillSets = [
  confirmedExpertSkill,
  maybeExpertSkill,
  notExpertSkill,
  disqualifiedSkill,
  notVettableSkill,
  noSpecializationSkill
]

const arrangeTest = (skills?: SkillSets, loading?: boolean) =>
  render(
    <TestWrapper>
      <VettedSkillsFields
        talentType='Developer'
        skills={skills}
        loading={loading}
      />
    </TestWrapper>
  )

const getSkillsVettedSections = () => ({
  confirmedExpertSection: screen.getAllByTestId('row-item')[0],
  maybeExpertSection: screen.getAllByTestId('row-item')[1],
  notExpertSection: screen.getAllByTestId('row-item')[2],
  standardVettingSection: screen.getAllByTestId('row-item')[3]
})

describe('VettedSkillsFields', () => {
  it('renders vetted skill sections', () => {
    arrangeTest(skillSets)

    const {
      confirmedExpertSection,
      maybeExpertSection,
      notExpertSection,
      standardVettingSection
    } = getSkillsVettedSections()

    expect(
      within(confirmedExpertSection).getByText(confirmedExpertSkill.skill.name)
    ).toBeInTheDocument()

    expect(
      within(maybeExpertSection).getByText(maybeExpertSkill.skill.name)
    ).toBeInTheDocument()

    expect(
      within(notExpertSection).getByText(notExpertSkill.skill.name)
    ).toBeInTheDocument()

    expect(
      within(standardVettingSection).getByText(notVettableSkill.skill.name)
    ).toBeInTheDocument()
  })

  it('does not render vetted skills', () => {
    arrangeTest([], false)

    expect(screen.queryByText('Confirmed Expert')).not.toBeInTheDocument()

    expect(screen.queryByText('Confirmation Needed')).not.toBeInTheDocument()

    expect(screen.queryByText('Lower Confidence')).not.toBeInTheDocument()

    expect(screen.queryByText('Standard Vetting')).not.toBeInTheDocument()
  })
})

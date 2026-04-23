import React from 'react'
import { render, screen } from '@testing-library/react'
import { TalentCumulativeStatus } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  TalentListSkillSetFragment,
  TalentsListItemFragment,
  PortfolioItems,
  TalentDetails
} from '@staff-portal/talents-list'
import { createTalentsListItemFragmentMock } from '@staff-portal/talents-list/src/mocks'
import { Vertical } from '@staff-portal/talents'

import GeneralSection from './GeneralSection'

jest.mock('@staff-portal/query-params-state', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/query-params-state')
}))

jest.mock('@staff-portal/talents/src/components/SkillTag/SkillTag.tsx', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <>{name}</>
}))

jest.mock('@staff-portal/talents-list', () => ({
  PortfolioItems: jest.fn(),
  TalentDetails: jest.fn()
}))

const MockTalentDetails = TalentDetails as jest.Mock
const MockPortfolioItems = PortfolioItems as jest.Mock

const arrangeTest = ({
  talentFragment
}: {
  talentFragment: TalentsListItemFragment
  skillSets?: TalentListSkillSetFragment
}) => {
  render(
    <TestWrapperWithMocks>
      <GeneralSection talent={talentFragment} isBestMatchQueryEnabled={false} />
    </TestWrapperWithMocks>
  )
}

describe('Talent List Item General Section', () => {
  beforeEach(() => {
    MockTalentDetails.mockImplementation(() => (
      <div data-testid='MockTalentDetails' />
    ))
    MockPortfolioItems.mockImplementation(() => (
      <div data-testid='MockPortfolioItems' />
    ))
  })

  it('renders `TalentDetails` with correct props', async () => {
    const talentFragment = createTalentsListItemFragmentMock({
      cumulativeStatus: TalentCumulativeStatus.ACTIVE
    })

    arrangeTest({ talentFragment })

    expect(screen.getByTestId('MockTalentDetails')).toBeInTheDocument()
    expect(MockTalentDetails).toHaveBeenCalledWith(
      expect.objectContaining({
        talent: talentFragment,
        jobCandidate: undefined,
        jobData: undefined,
        isBestMatchQueryEnabled: false
      }),
      {}
    )
  })

  it('renders `MockPortfolioItems` with correct props', async () => {
    const talentType = Vertical.DESIGNER

    const talentFragment = createTalentsListItemFragmentMock({
      type: talentType
    })

    arrangeTest({ talentFragment })

    expect(screen.getByTestId('MockPortfolioItems')).toBeInTheDocument()
    expect(MockPortfolioItems).toHaveBeenCalledWith(
      expect.objectContaining({
        talentName: talentFragment.fullName,
        talentId: talentFragment.id
      }),
      {}
    )
  })
})

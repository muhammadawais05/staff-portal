import React from 'react'
import { render, screen } from '@testing-library/react'
import { SoftSkillRatingValue } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import {
  TestErrorBoundary,
  assertErrorBoundaryErrorsCalled,
  TestWrapperWithMocks
} from '@staff-portal/test-utils'

import {
  createGetTalentSoftSkillsMock,
  createGetTalentSoftSkillsFailedMock,
  createSoftSkillsRatingFragmentMock
} from '../../data/get-talent-soft-skills/mocks'
import TalentSoftSkillsSection from './TalentSoftSkillsSection'

jest.mock('./components/CreateTalentSoftSkillRatingButton', () => ({
  __esModule: true,
  default: () => <div />
}))

jest.mock('@toptal/staff-portal-message-bus')

const arrangeTest = ({
  talentId,
  mocks,
  errorBoundaryMessage = ''
}: {
  talentId: string
  mocks: MockedResponse[]
  errorBoundaryMessage?: string
}) =>
  render(
    <TestErrorBoundary errorMessage={errorBoundaryMessage}>
      <TestWrapperWithMocks mocks={mocks}>
        <TalentSoftSkillsSection talentId={talentId} />
      </TestWrapperWithMocks>
    </TestErrorBoundary>
  )

describe('TalentSoftSkillsSection', () => {
  const defaultRatingHints = [
    {
      description: 'Some description',
      title: 'Some title',
      value: SoftSkillRatingValue.RATING_1
    }
  ]

  describe('when data is loaded', () => {
    it('shows title and data', async () => {
      const SOFT_SKILL_ID = '123'
      const SOFT_SKILL_NAME = 'Test Skill asd723'
      const softSkillRatings = {
        id: '123',
        softSkillRatings: {
          nodes: [
            {
              ...createSoftSkillsRatingFragmentMock(SOFT_SKILL_ID),
              value: SoftSkillRatingValue.RATING_5
            }
          ]
        }
      }

      const talentSoftSkillsMock = createGetTalentSoftSkillsMock(
        softSkillRatings,
        [
          {
            id: SOFT_SKILL_ID,
            name: SOFT_SKILL_NAME,
            ratingHints: defaultRatingHints
          }
        ]
      )

      arrangeTest({
        talentId: talentSoftSkillsMock.result.data.node.id,
        mocks: [talentSoftSkillsMock]
      })

      expect(await screen.findByText(SOFT_SKILL_NAME)).toBeInTheDocument()
      expect(screen.getByTestId('rating').textContent).toBe('5')
      expect(screen.getByTestId('rating-count').textContent).toBe('1')
    })

    it('renders cumulative rating without decimals', async () => {
      const SOFT_SKILL_ID = '123'
      const SOFT_SKILL_NAME = 'Test Skill ai728z'
      const softSkillRatings = {
        id: '123',
        softSkillRatings: {
          nodes: [
            {
              ...createSoftSkillsRatingFragmentMock(SOFT_SKILL_ID),
              value: SoftSkillRatingValue.RATING_5
            }
          ]
        }
      }

      const talentSoftSkillsMock = createGetTalentSoftSkillsMock(
        softSkillRatings,
        [
          {
            id: SOFT_SKILL_ID,
            name: SOFT_SKILL_NAME,
            ratingHints: defaultRatingHints
          }
        ]
      )

      arrangeTest({
        talentId: talentSoftSkillsMock.result.data.node.id,
        mocks: [talentSoftSkillsMock]
      })

      expect(await screen.findByText(/soft skills/i)).toBeInTheDocument()
      expect(screen.getByTestId('rating').textContent).toBe('5')
    })
  })

  describe('when data fails to load', () => {
    it('triggers an error boundary', async () => {
      const talentId = '123'
      const errorMessage = 'TEST_ERROR_MESSAGE'

      const getTalentFailedMock = createGetTalentSoftSkillsFailedMock(
        { talentId },
        errorMessage
      )

      arrangeTest({
        talentId,
        mocks: [getTalentFailedMock],
        errorBoundaryMessage: errorMessage
      })

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      expect(await screen.findByText(errorMessage)).toBeInTheDocument()

      assertErrorBoundaryErrorsCalled(
        consoleErrorSpy,
        errorMessage,
        TalentSoftSkillsSection
      )
    })
  })
})

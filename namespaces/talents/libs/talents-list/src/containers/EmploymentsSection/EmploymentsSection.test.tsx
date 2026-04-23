import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import EmploymentsSection from './EmploymentsSection'
import {
  createGetTalentEmploymentsSectionMock,
  createGetTalentEmploymentsSectionFailedMock
} from './data/get-talent-employments-section/mocks'

const TALENT_ID = 'test-id'

const arrangeTest = (mocks: MockedResponse[]) => {
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <EmploymentsSection talentId={TALENT_ID} />
    </TestWrapperWithMocks>
  )
}

describe('Talent List Item Employment Section', () => {
  it('shows an error when query fails', async () => {
    const ERROR_MESSAGE = 'Failed fetching talent employments section.'

    arrangeTest([
      createGetTalentEmploymentsSectionFailedMock({
        talentId: TALENT_ID
      })
    ])

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
  })

  it('shows always certain fields', () => {
    const mocks = createGetTalentEmploymentsSectionMock({
      talentId: TALENT_ID
    })

    arrangeTest([mocks])
    waitFor(() => {
      expect(
        screen.getByTestId(/talent-employment-position/i)
      ).toBeInTheDocument()

      expect(
        screen.getByTestId(/talent-employment-company/i)
      ).toBeInTheDocument()

      expect(
        screen.getByTestId(/talent-employment-experience-item/i)
      ).toBeInTheDocument()

      expect(
        screen.getByTestId(/talent-employment-skills-list/i)
      ).toBeInTheDocument()
    })
  })
})

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import TalentSpecializationApplicationsSection from './TalentSpecializationApplicationsSection'
import {
  createGetTalentSpecializationApplicationsMock,
  createGetTalentSpecializationApplicationsFailedMock
} from './data/get-talent-specialization-applications/mocks'

jest.mock('@staff-portal/utils', () => ({
  ...jest.requireActual('@staff-portal/utils'),
  usePrevious: jest.fn()
}))

const mockShowDevError = jest.fn()

jest.mock('@staff-portal/error-handling', () => ({
  useNotifications: () => ({
    showDevError: mockShowDevError
  })
}))

const arrangeTest = (talentId: string, mocks: MockedResponse[]) => {
  return render(
    <TestWrapperWithMocks mocks={mocks}>
      <TalentSpecializationApplicationsSection talentId={talentId} />
    </TestWrapperWithMocks>
  )
}

describe('TalentSpecializationApplicationsSection', () => {
  it('displays no content when unable to get specialization applications', async () => {
    const talentId = 'VjEtVGFsZW50LTE5NzE4OTc'

    const { queryByTestId } = arrangeTest(talentId, [
      createGetTalentSpecializationApplicationsFailedMock({ talentId })
    ])

    await waitFor(() => {
      expect(
        queryByTestId('talent-specialization-applications-section')
      ).not.toBeInTheDocument()

      expect(mockShowDevError).toHaveBeenCalledWith(
        'Unable to get specialization applications.'
      )
    })
  })

  it('lists specialization applications', async () => {
    const talentId = 'VjEtVGFsZW50LTE5NzE4OTc'
    const specializationTitle = 'The title'

    const { queryByTestId } = arrangeTest(talentId, [
      createGetTalentSpecializationApplicationsMock({
        talentId,
        specializationTitle
      })
    ])

    expect(await screen.findByText(specializationTitle)).toBeInTheDocument()
    expect(
      queryByTestId('talent-specialization-applications-section')
    ).toBeInTheDocument()
  })
})

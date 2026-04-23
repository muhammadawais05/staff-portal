import { fireEvent, render } from '@testing-library/react'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import React from 'react'
import { MemoryRouter } from '@staff-portal/navigation'
import {
  TestWrapperWithMocks,
  assertOnTooltipText
} from '@staff-portal/test-utils'

import ApproveJobStep2 from './ApproveJobStep2'
import { useGetRecommendedSkills, useGetCoreSkills } from './data'
import { ApproveJobForm, JobDetails } from '../../types'
import { GetApproveJobDetailsQuery } from '../../data'
import { createAdditionalDetailsMock } from '../../data/get-approve-job-details/mocks'

jest.mock('./data', () => ({
  __esModule: true,
  useGetCoreSkills: jest.fn(() => null),
  useGetRecommendedSkills: jest.fn(() => null)
}))

const mockReturnValues = () => {
  const mockedUseGetCoreSkills = useGetCoreSkills as jest.Mock
  const mockedUseGetRecommendedSkills = useGetRecommendedSkills as jest.Mock

  mockedUseGetCoreSkills.mockReturnValue([jest.fn()])

  mockedUseGetRecommendedSkills.mockReturnValue({
    getRecommendedSkills: jest.fn()
  })
}

const arrangeTest = (additionalDetails: {
  node: JobDetails
  viewer: GetApproveJobDetailsQuery['viewer']
}) => {
  return {
    renderResult: render(
      <TestWrapperWithMocks mocks={[]}>
        <MemoryRouter>
          <Form<ApproveJobForm>
            onSubmit={() => {}}
            mutators={{ ...arrayMutators }}
          >
            <ApproveJobStep2
              job={additionalDetails.node}
              onClose={() => {}}
              navigateToStep1={() => {}}
            />
          </Form>
        </MemoryRouter>
      </TestWrapperWithMocks>
    )
  }
}

describe('Approve job - Step two', () => {
  it('the job skills must be visible', async () => {
    mockReturnValues()

    const {
      renderResult: { getByText }
    } = arrangeTest(createAdditionalDetailsMock())

    expect(getByText('Skill Name (12)')).toBeInTheDocument()
  })

  it('the mark skill as required text should be visible', async () => {
    mockReturnValues()

    const {
      renderResult: { getByText, getByTestId }
    } = arrangeTest(createAdditionalDetailsMock())

    expect(
      getByText(/To mark skills as required click on the asterisk/)
    ).toBeInTheDocument()

    const requiredButton = getByTestId('require-skill')

    assertOnTooltipText(requiredButton, 'Mark as a required skill')

    fireEvent.click(requiredButton)

    assertOnTooltipText(requiredButton, 'Skill marked as required')
  })
})

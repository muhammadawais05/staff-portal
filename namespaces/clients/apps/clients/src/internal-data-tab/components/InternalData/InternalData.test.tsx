import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import Quiz from '../../../components/Quiz'
import Comments from '../../../components/Comments'
import SystemInformation from '../../../components/SystemInformation'
import ReviewAttempts from '../../../components/ReviewAttempts'
import Investigations from '../../../components/Investigations'
import InternalData from '.'

jest.mock('../../../components/Quiz', () => jest.fn())
jest.mock('../../../components/Comments', () => jest.fn())
jest.mock('../../../components/ReviewAttempts', () =>
  jest.fn()
)
jest.mock('../../../components/Investigations', () =>
  jest.fn()
)
jest.mock('../../../components/SystemInformation', () =>
  jest.fn()
)
jest.mock('@staff-portal/error-handling')

const companyId = 'companyId'

const arrangeTest = (props: ComponentProps<typeof InternalData>) =>
  render(
    <TestWrapper>
      <InternalData {...props} />
    </TestWrapper>
  )

describe('InternalData', () => {
  it('displays proper sub components', () => {
    const mockQuiz = Quiz as jest.Mock
    const mockedQuiz = jest.fn(() => null)
    const mockComments = Comments as unknown as jest.Mock
    const mockSystemInformation = SystemInformation as unknown as jest.Mock
    const mockedSystemInformation = jest.fn(() => null)
    const mockReviewAttempts = ReviewAttempts as jest.Mock
    const mockedReviewAttempts = jest.fn(() => null)
    const mockInvestigations = Investigations as jest.Mock
    const mockedInvestigations = jest.fn(() => null)

    mockQuiz.mockImplementationOnce(mockedQuiz)
    mockComments.mockReturnValue(null)
    mockSystemInformation.mockImplementationOnce(mockedSystemInformation)
    mockReviewAttempts.mockImplementationOnce(mockedReviewAttempts)
    mockInvestigations.mockImplementationOnce(mockedInvestigations)

    arrangeTest({ companyId })

    expect(mockedQuiz).toHaveBeenCalledTimes(1)
    expect(mockedQuiz).toHaveBeenCalledWith(
      {
        companyId
      },
      {}
    )
    expect(Comments).toHaveBeenCalledTimes(1)
    expect(Comments).toHaveBeenCalledWith(
      {
        companyId
      },
      {}
    )
    expect(mockedSystemInformation).toHaveBeenCalledTimes(1)
    expect(mockedSystemInformation).toHaveBeenCalledWith(
      {
        companyId
      },
      {}
    )
    expect(mockedReviewAttempts).toHaveBeenCalledTimes(1)
    expect(mockedReviewAttempts).toHaveBeenCalledWith(
      {
        clientId: companyId
      },
      {}
    )
    expect(mockedInvestigations).toHaveBeenCalledTimes(1)
    expect(mockedInvestigations).toHaveBeenCalledWith(
      {
        companyId
      },
      {}
    )
  })
})

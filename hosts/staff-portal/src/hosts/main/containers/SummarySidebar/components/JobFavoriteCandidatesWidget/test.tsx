import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetMatchedJobId } from './hooks/use-get-matched-job-id'
import JobFavoriteCandidatesWidgetContent from '../JobFavoriteCandidatesWidgetContent'
import JobFavoriteCandidatesWidget from './JobFavoriteCandidatesWidget'

jest.mock('./hooks/use-get-matched-job-id')
jest.mock('../JobFavoriteCandidatesWidgetContent')

const useGetMatchedJobIdMock = useGetMatchedJobId as jest.Mock
const JobFavoriteCandidatesWidgetContentMock =
  JobFavoriteCandidatesWidgetContent as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobFavoriteCandidatesWidget />
    </TestWrapper>
  )

describe('JobFavoriteCandidatesWidget', () => {
  it('renders nothing if no job id matched', () => {
    expect(screen.queryByTestId('widget-content')).not.toBeInTheDocument()
  })

  it('renders widget content if on job page', () => {
    const TEST_ID = 'TEST_ID'

    useGetMatchedJobIdMock.mockReturnValue(TEST_ID)
    JobFavoriteCandidatesWidgetContentMock.mockReturnValue(
      <div data-testid='widget-content' />
    )

    const { getByTestId } = arrangeTest()

    expect(getByTestId('widget-content')).toBeInTheDocument()
    expect(JobFavoriteCandidatesWidgetContentMock).toHaveBeenCalledWith(
      expect.objectContaining({ jobId: TEST_ID }),
      {}
    )
  })
})

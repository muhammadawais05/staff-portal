import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetJobFavoriteTalents } from './data/get-job-favorite-talents.staff.gql'
import { useClearJobFavoriteTalents } from './data/clear-job-favorite-talents.staff.gql'
import { JobFavoriteTalentFragment } from './data/job-favorite-talents-fragment.staff.gql.types'
import JobFavoriteCandidatesWidgetContent from './JobFavoriteCandidatesWidgetContent'

jest.mock('./data/get-job-favorite-talents.staff.gql')
jest.mock('./data/clear-job-favorite-talents.staff.gql')

jest.mock('../JobFavoriteCandidateItem', () => ({
  __esModule: true,
  default: ({ talent }: { talent: { fullName: string } }) => (
    <div data-testid={`candidate-item: ${talent.fullName}`} />
  )
}))

const useClearJobFavoriteTalentsMock = useClearJobFavoriteTalents as jest.Mock
const useGetJobFavoriteTalentsMock = useGetJobFavoriteTalents as jest.Mock

const FAVORITE_CANDIDATES: JobFavoriteTalentFragment[] = [
  { id: 'talent-1', fullName: 'Alex', webResource: { text: 'Alex' } },
  { id: 'talent-2', fullName: 'Mike', webResource: { text: 'Mike' } }
]

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobFavoriteCandidatesWidgetContent jobId='test-job-id' />
    </TestWrapper>
  )

describe('JobFavoriteCandidatesWidgetContent', () => {
  beforeEach(() => {
    useClearJobFavoriteTalentsMock.mockReturnValue([jest.fn(), {}])
  })

  describe('renders nothing', () => {
    it('renders nothing if no data fetched', () => {
      useGetJobFavoriteTalentsMock.mockReturnValue({
        data: null
      })

      arrangeTest()

      expect(
        screen.queryByTestId('sidebar-widget:job-favorites')
      ).not.toBeInTheDocument()
    })

    it('renders nothing if there are no items in the list', () => {
      useGetJobFavoriteTalentsMock.mockReturnValue({
        data: []
      })

      arrangeTest()

      expect(
        screen.queryByTestId('sidebar-widget:job-favorites')
      ).not.toBeInTheDocument()
    })
  })

  describe('items are fetched', () => {
    beforeEach(() => {
      useGetJobFavoriteTalentsMock.mockReturnValue({
        data: FAVORITE_CANDIDATES
      })
    })

    it('renders favorite candidate items', () => {
      arrangeTest()

      expect(
        screen.getByTestId('sidebar-widget:job-favorites')
      ).toBeInTheDocument()
      expect(screen.getByTestId('candidate-item: Alex')).toBeInTheDocument()
      expect(screen.getByTestId('candidate-item: Mike')).toBeInTheDocument()
    })

    it('renders "clear all" button', () => {
      arrangeTest()

      expect(screen.getByText('Clear All')).toBeInTheDocument()
    })

    it('calls "clear all" mutation when pressing the button', () => {
      const mockedMutation = jest.fn()

      useClearJobFavoriteTalentsMock.mockReturnValue([mockedMutation, {}])
      arrangeTest()

      const clearAllButton = screen.getByText('Clear All')

      fireEvent.click(clearAllButton)
      expect(mockedMutation).toHaveBeenCalledWith({
        variables: { jobId: 'test-job-id' }
      })
    })
  })
})

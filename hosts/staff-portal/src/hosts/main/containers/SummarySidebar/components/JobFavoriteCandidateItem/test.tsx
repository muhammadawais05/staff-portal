import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useRemoveTalentFromJobFavorites } from '@staff-portal/talents'

import { JobFavoriteTalentFragment } from '../JobFavoriteCandidatesWidgetContent/data/job-favorite-talents-fragment.staff.gql.types'
import JobFavoriteCandidateItem from './JobFavoriteCandidateItem'

jest.mock('@staff-portal/talents/src/data/remove-talent-from-job-favorites')

const useRemoveTalentFromJobFavoritesMock =
  useRemoveTalentFromJobFavorites as jest.Mock

const TEST_FAVORITE_TALENT: JobFavoriteTalentFragment = {
  id: 'talent-id',
  fullName: 'Alex',
  webResource: { text: 'Alex' }
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobFavoriteCandidateItem
        talent={TEST_FAVORITE_TALENT}
        onItemRemoved={() => {}}
        jobId='test-job-id'
      />
    </TestWrapper>
  )

describe('JobFavoriteCandidateItem', () => {
  beforeEach(() => {
    useRemoveTalentFromJobFavoritesMock.mockReturnValue([jest.fn(), {}])
  })

  it('renders talent name', () => {
    arrangeTest()
    expect(screen.getByText('Alex')).toBeInTheDocument()
  })

  it('calls "remove talent" mutation when clicking "delete" button', () => {
    const mockedMutation = jest.fn()

    useRemoveTalentFromJobFavoritesMock.mockReturnValue([mockedMutation, {}])
    arrangeTest()

    const deleteButton = screen.getByRole('button', { name: 'delete icon' })

    fireEvent.click(deleteButton)

    expect(mockedMutation).toHaveBeenCalledWith({
      variables: {
        jobId: 'test-job-id',
        talentId: 'talent-id'
      }
    })
  })
})

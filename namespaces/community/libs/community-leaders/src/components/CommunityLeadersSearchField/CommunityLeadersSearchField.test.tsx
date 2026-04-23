import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { CommunityLeadersSearchField } from '..'

const arrangeTest = (
  onChange: React.Dispatch<
    React.SetStateAction<{
      page: number
      nameSearch: string
    }>
  >
) => {
  return render(
    <TestWrapper>
      <CommunityLeadersSearchField
        onChange={onChange}
        placeholder='Search for a community leader'
      />
    </TestWrapper>
  )
}

const mockOnChange = jest.fn()

describe('CommunityLeadersSearchField', () => {
  it('calls the on change method with the new value', async () => {
    arrangeTest(mockOnChange)

    const input = screen.getByPlaceholderText('Search for a community leader')

    fireEvent.change(input, {
      target: { value: 'Alex' }
    })

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({ nameSearch: 'Alex', page: 0 })
    })
  })
})

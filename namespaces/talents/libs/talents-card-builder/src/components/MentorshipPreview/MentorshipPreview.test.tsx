import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'
import React, { ReactNode } from 'react'

import HighlightItemPreview from '../HighlightItemPreview/HighlightItemPreview'
import MentorshipPreview from './MentorshipPreview'

jest.mock('../HighlightItemPreview/HighlightItemPreview')

const mockHighlightItemPreview = HighlightItemPreview as jest.Mock

const renderComponent = () => {
  mockHighlightItemPreview.mockImplementation(
    ({ children }: { children: ReactNode }) => <>{children}</>
  )

  return render(
    <TestWrapper>
      <MentorshipPreview fullName='Talent Name' />
    </TestWrapper>
  )
}

describe('MentorshipPreview', () => {
  it('calls the HighlightItemPreview', () => {
    renderComponent()

    expect(mockHighlightItemPreview).toHaveBeenCalledWith(
      {
        title: 'Toptal Mentor',
        children: expect.anything()
      },
      expect.anything()
    )

    expect(
      screen.getByText(
        "Talent Name is a mentor in the Toptal Global Mentor's Program."
      )
    ).toBeInTheDocument()
  })
})

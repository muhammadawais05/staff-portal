import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { ShowMore } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import InvestigationComment from '.'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  ShowMore: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof InvestigationComment>) =>
  render(
    <TestWrapper>
      <InvestigationComment {...props} />
    </TestWrapper>
  )

describe('InvestigationComment', () => {
  it('shows element to show more', () => {
    const ShowMoreMock = (ShowMore as unknown as jest.Mock).mockImplementation(
      () => null
    )
    const comment =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur tellus ut ante tincidunt, sed tincidunt tortor sodales. Pellentesque placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur tellus ut ante tincidunt, sed tincidunt tortor sodales. Pellentesque placerat.'

    arrangeTest({
      comment
    })

    expect(ShowMoreMock).toHaveBeenCalledWith(
      expect.objectContaining({
        rows: 2,
        children: comment
      }),
      {}
    )
  })

  it('shows comment', () => {
    arrangeTest({
      comment: 'comment'
    })

    expect(screen.getByText('comment')).toBeInTheDocument()
  })
})

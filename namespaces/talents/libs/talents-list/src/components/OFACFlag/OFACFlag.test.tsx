import React from 'react'
import { screen, render } from '@testing-library/react'
import { OfacStatus } from '@staff-portal/graphql/staff'
import { TestWrapper, assertOnTooltip } from '@staff-portal/test-utils'

import OFACFlag, { Props } from './OFACFlag'

const arrangeTest = ({ ofacStatus, ofacStatusComment }: Props) =>
  render(
    <TestWrapper>
      <OFACFlag ofacStatus={ofacStatus} ofacStatusComment={ofacStatusComment} />
    </TestWrapper>
  )

describe('OFACFlag', () => {
  it('hides the OFAC flag when status is NORMAL', () => {
    arrangeTest({
      ofacStatus: OfacStatus.NORMAL
    })

    expect(screen.queryByText(/OFAC/i)).not.toBeInTheDocument()
  })

  it('shows the OFAC flag when status is RESTRICTED', () => {
    const ofacStatusComment = 'some comment'

    arrangeTest({
      ofacStatus: OfacStatus.RESTRICTED,
      ofacStatusComment
    })

    const flag = screen.getByText(/OFAC Restricted/i)

    assertOnTooltip(flag, tooltip => {
      expect(tooltip).toHaveTextContent(ofacStatusComment)
    })
  })

  it('shows the OFAC flag when status is INVESTIGATION', () => {
    const ofacStatusComment = 'some comment'

    arrangeTest({
      ofacStatus: OfacStatus.INVESTIGATION,
      ofacStatusComment
    })

    const flag = screen.getByText(/OFAC Investigation/i)

    assertOnTooltip(flag, tooltip => {
      expect(tooltip).toHaveTextContent(ofacStatusComment)
    })
  })
})

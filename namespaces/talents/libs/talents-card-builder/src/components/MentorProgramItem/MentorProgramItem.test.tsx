import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import MentorProgramItem, { MentorProgramItemProps } from './MentorProgramItem'

const renderComponent = (props: Pick<MentorProgramItemProps, 'toggle'>) =>
  render(
    <TestWrapper>
      <MentorProgramItem highlighted={false} fullName='John Doe' {...props} />
    </TestWrapper>
  )

describe('MentorProgramItem', () => {
  it('renders item', () => {
    renderComponent({ toggle: jest.fn() })

    expect(screen.getByText(/John Doe/)).toBeInTheDocument()
  })

  it('toggles item on click', () => {
    const handleClick = jest.fn()

    renderComponent({ toggle: handleClick })

    fireEvent.click(screen.getByText(/John Doe/))

    expect(handleClick).toHaveBeenCalled()
  })
})

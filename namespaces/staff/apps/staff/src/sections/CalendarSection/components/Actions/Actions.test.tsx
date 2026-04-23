import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import Actions from './Actions'

const renderComponent = (props: ComponentProps<typeof Actions>) =>
  render(
    <TestWrapper>
      <Actions {...props} />
    </TestWrapper>
  )

describe('CalendarSection', () => {
  it('default render', () => {
    const selectedDate = new Date('2022-02-02T00:00:00.000Z')

    renderComponent({ selectedDate, updateMonth: () => null })

    expect(screen.getByTestId('calendar-skeleton-label')).toHaveTextContent('February 2022')
  })
})

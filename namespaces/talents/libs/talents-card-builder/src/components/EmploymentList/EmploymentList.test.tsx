import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import EmploymentList, { EmploymentListProps } from './EmploymentList'
import getProfileEmploymentMock from '../../mocks/get-profile-employment-mock/get-profile-employment-mock'

const renderComponent = (
  props: Pick<EmploymentListProps, 'data' | 'toggleItemDescription'>
) =>
  render(
    <TestWrapper>
      <EmploymentList value={[]} toggleItem={jest.fn()} {...props} />
    </TestWrapper>
  )

describe('EmploymentList', () => {
  it('renders employment data', () => {
    const employment1 = getProfileEmploymentMock({
      position: 'Lead designer',
      company: 'Big startup'
    })

    const employment2 = getProfileEmploymentMock({
      position: 'Lead developer',
      company: 'Small startup'
    })

    renderComponent({
      data: [employment1, employment2],
      toggleItemDescription: jest.fn()
    })

    expect(screen.getByText('Lead designer')).toBeInTheDocument()
    expect(screen.getByText(/Big startup/)).toBeInTheDocument()
  })

  it('toggles the item on click', () => {
    const employment = getProfileEmploymentMock({
      id: 'e1',
      position: 'Lead designer',
      company: 'Big startup',
      experienceItems: ['Line 1']
    })

    const toggleItemDescription = jest.fn()

    renderComponent({ data: [employment], toggleItemDescription })

    fireEvent.click(screen.getByText('Line 1'))

    expect(toggleItemDescription).toHaveBeenCalledWith('e1', 'Line 1')
  })
})

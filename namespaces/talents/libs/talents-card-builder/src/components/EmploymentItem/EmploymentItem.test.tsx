import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import EmploymentItem, { EmploymentItemProps } from './EmploymentItem'
import getProfileEmploymentMock from '../../mocks/get-profile-employment-mock/get-profile-employment-mock'

const renderComponent = (props: Pick<EmploymentItemProps, 'employment'>) =>
  render(
    <TestWrapper>
      <EmploymentItem
        highlighted={{ description_items: [] }}
        toggleItem={jest.fn()}
        toggleItemDescription={jest.fn()}
        {...props}
      />
    </TestWrapper>
  )

describe('EmploymentItem', () => {
  it('renders employment data', () => {
    const employment = getProfileEmploymentMock({
      position: 'Lead developer',
      company: 'Tesco',
      startDate: 2010,
      endDate: 2020,
      experienceItems: [
        'This is what I did there.',
        'This is what I pretend I did there.'
      ]
    })

    renderComponent({ employment })

    expect(screen.getByText('Lead developer')).toBeInTheDocument()
    expect(screen.getByText(/Tesco/)).toBeInTheDocument()
    expect(screen.getByText(/2010 – 2020/)).toBeInTheDocument()
    expect(screen.getByText('This is what I did there.')).toBeInTheDocument()
    expect(
      screen.getByText('This is what I pretend I did there.')
    ).toBeInTheDocument()
  })

  it('renders present employment', () => {
    const employment = getProfileEmploymentMock({
      startDate: 2010,
      endDate: null
    })

    renderComponent({ employment })

    expect(screen.getByText(/2010 – Present/)).toBeInTheDocument()
  })

  it('renders less than one year long employment', () => {
    const employment = getProfileEmploymentMock({
      startDate: 2010,
      endDate: 2010
    })

    renderComponent({ employment })

    expect(screen.getByText(/2010/)).toBeInTheDocument()
    expect(screen.queryByText(/2010 –/)).not.toBeInTheDocument()
  })
})

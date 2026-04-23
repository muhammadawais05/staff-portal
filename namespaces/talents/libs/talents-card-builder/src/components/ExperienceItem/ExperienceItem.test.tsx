import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import ExperienceItem, { ExperienceItemProps } from './ExperienceItem'
import getProfileExperienceMock from '../../mocks/get-profile-experience-mock/get-profile-experience-mock'

const renderComponent = (props: Pick<ExperienceItemProps, 'item' | 'toggle'>) =>
  render(
    <TestWrapper>
      <ExperienceItem highlighted={false} {...props} />
    </TestWrapper>
  )

describe('ExperienceItem', () => {
  it('renders experience data', () => {
    const item = getProfileExperienceMock({
      title: 'Experience Item',
      description: 'This is the item description.',
      link: 'https://toptal.com'
    })

    renderComponent({ item, toggle: jest.fn() })

    expect(screen.getByText('Experience Item')).toBeInTheDocument()
    expect(
      screen.getByText('This is the item description.')
    ).toBeInTheDocument()
    expect(screen.getByText('https://toptal.com')).toBeInTheDocument()
  })

  it('calls the toggle callback on click', () => {
    const item = getProfileExperienceMock({
      id: 'e1',
      title: 'Experience Item'
    })

    const toggle = jest.fn()

    renderComponent({ item, toggle })

    fireEvent.click(screen.getByText('Experience Item'))

    expect(toggle).toHaveBeenCalledWith('e1')
  })
})

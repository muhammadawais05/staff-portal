import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import EducationItem, { EducationItemProps } from './EducationItem'
import getProfileEducationMock from '../../mocks/get-profile-education-mock/get-profile-education-mock'

const renderComponent = (props: Pick<EducationItemProps, 'education'>) =>
  render(
    <TestWrapper>
      <EducationItem selected={false} onClick={jest.fn()} {...props} />
    </TestWrapper>
  )

describe('EducationItem', () => {
  it('renders education data', () => {
    const education = getProfileEducationMock({
      title: 'Warsaw Medical University',
      location: 'Warsaw, Poland',
      fieldOfStudy: 'Medicine',
      degree: 'Professional Degree'
    })

    renderComponent({ education })

    expect(
      screen.getByText('Professional Degree in Medicine')
    ).toBeInTheDocument()
  })

  it('renders the education duration', () => {
    const education = getProfileEducationMock({
      yearFrom: 1991,
      yearTo: 1997
    })

    const { container } = renderComponent({ education })

    expect(container.textContent).toContain('1991 - 1997')
  })
})

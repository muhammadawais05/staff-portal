import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import EducationList, { EducationListProps } from './EducationList'
import getProfileEducationMock from '../../mocks/get-profile-education-mock/get-profile-education-mock'

const renderComponent = (
  props: Pick<EducationListProps, 'data' | 'toggleItem'>
) =>
  render(
    <TestWrapper>
      <EducationList value={[]} {...props} />
    </TestWrapper>
  )

describe('EducationList', () => {
  it('renders nothing when there is no data', () => {
    render(<EducationList data={[]} value={[]} toggleItem={jest.fn()} />)

    expect(screen.queryByText('Education')).not.toBeInTheDocument()
    expect(screen.queryByTestId('educationItem')).not.toBeInTheDocument()
  })

  it('renders education data', () => {
    const educations = [
      getProfileEducationMock({
        title: 'Warsaw Technical University',
        location: 'Warsaw, Poland',
        fieldOfStudy: 'Information Systems',
        degree: "Master's Degree"
      }),
      getProfileEducationMock({
        title: 'Warsaw Medical University',
        location: 'Warsaw, Poland',
        fieldOfStudy: 'Medicine',
        degree: 'Professional Degree'
      })
    ]

    renderComponent({ data: educations, toggleItem: jest.fn() })

    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(
      screen.getByText("Master's Degree in Information Systems")
    ).toBeInTheDocument()
    expect(
      screen.getByText('Professional Degree in Medicine')
    ).toBeInTheDocument()
  })

  it('toggles the item on click', () => {
    const educations = [
      getProfileEducationMock({
        id: 'education1',
        title: 'Warsaw Medical University',
        location: 'Warsaw, Poland',
        fieldOfStudy: 'Medicine',
        degree: 'Professional Degree'
      })
    ]

    const toggleItem = jest.fn()

    renderComponent({ data: educations, toggleItem })

    fireEvent.click(screen.getByText('Professional Degree in Medicine'))

    expect(toggleItem).toHaveBeenCalledWith('education1')
  })
})

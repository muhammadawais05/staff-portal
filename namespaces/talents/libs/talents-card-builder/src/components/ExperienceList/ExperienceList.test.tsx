import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import ExperienceList, { ExperienceListProps } from './ExperienceList'
import getProfileExperienceMock from '../../mocks/get-profile-experience-mock/get-profile-experience-mock'
import getProfilePublicationMock from '../../mocks/get-profile-publication-mock/get-profile-publication-mock'

const renderComponent = (
  props: Pick<
    ExperienceListProps,
    'experiences' | 'publications' | 'toggleItem'
  >
) =>
  render(
    <TestWrapper>
      <ExperienceList
        talentId='talentId'
        title='Experience'
        fullName='Talent Name'
        value={[]}
        approvedMentor
        {...props}
      />
    </TestWrapper>
  )

describe('ExperienceList', () => {
  it('renders experience data', () => {
    const experience1 = getProfileExperienceMock({
      title: 'Item 1',
      description: 'Description 1',
      link: 'Link 1'
    })

    const experience2 = getProfileExperienceMock({
      title: 'Item 2',
      description: 'Description 2'
    })

    const publication = getProfilePublicationMock({
      title: 'Blog post title',
      url: 'https://toptal.com'
    })

    renderComponent({
      experiences: [experience1, experience2],
      publications: [publication],
      toggleItem: jest.fn()
    })

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Description 1')).toBeInTheDocument()
    expect(screen.getByText('Link 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText(/Blog post title/)).toBeInTheDocument()
    expect(screen.getByText('https://toptal.com')).toBeInTheDocument()
    expect(screen.getByText('Toptal Mentor')).toBeInTheDocument()
  })

  it('toggles the item on click', () => {
    const experience = getProfileExperienceMock({
      id: 'ex1',
      title: 'Item 1'
    })

    const publication = getProfilePublicationMock({
      id: 'p1',
      title: 'Blog post title'
    })

    const toggleItem = jest.fn()

    renderComponent({
      experiences: [experience],
      publications: [publication],
      toggleItem
    })

    fireEvent.click(screen.getByText('Item 1'))

    expect(toggleItem).toHaveBeenNthCalledWith(1, {
      type: 'portfolio',
      id: 'ex1'
    })

    fireEvent.click(screen.getByText(/Blog post title/))

    expect(toggleItem).toHaveBeenNthCalledWith(2, {
      type: 'publication',
      id: 'p1'
    })

    fireEvent.click(screen.getByText('Toptal Mentor'))

    expect(toggleItem).toHaveBeenNthCalledWith(3, {
      type: 'mentorship',
      id: 'talentId'
    })
  })
})

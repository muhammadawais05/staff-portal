import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ResumePublications from './ResumePublications'
import { TalentPublishableFragment } from '../../data/get-talent-resume-publications/get-talent-resume-publications.staff.gql.types'

const createPublicationItem = ({
  imageUrl
}: {
  imageUrl?: TalentPublishableFragment['imageUrl']
}): TalentPublishableFragment => ({
  url: 'TEST_LINK',
  title: 'TEST_TITLE',
  imageUrl
})

const arrangeTest = (publications: TalentPublishableFragment[]) =>
  render(
    <TestWrapper>
      <ResumePublications publications={publications} />
    </TestWrapper>
  )

describe('ResumePublications', () => {
  it('renders the resume publications', () => {
    const publicationItem = createPublicationItem({})

    arrangeTest([publicationItem])

    expect(screen.getByText(publicationItem.url)).toHaveAttribute(
      'href',
      publicationItem.url
    )
    expect(screen.getByText(publicationItem.title)).toBeInTheDocument()
  })

  it('shows the publication image if exists', () => {
    const publicationItem = createPublicationItem({
      imageUrl: 'TEST_LINK'
    })

    arrangeTest([publicationItem])

    const publicationImage = screen.getByTestId('publication-image')

    expect(publicationImage).toBeInTheDocument()
    expect(publicationImage).toHaveAttribute('src', publicationItem.imageUrl)
  })
})

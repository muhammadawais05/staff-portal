import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { PortfolioItemKindEnum } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { TalentPortfolioItemFragment } from '@staff-portal/talents'

import PortfolioItemWithImage from './PortfolioItemWithImage'

const createPortolioItemData = ({
  skills = []
}: {
  skills?: TalentPortfolioItemFragment['skills']['nodes']
} = {}): TalentPortfolioItemFragment => ({
  id: '123',
  kindEnum: PortfolioItemKindEnum.BASIC,
  title: 'TEST_TITLE',
  description: 'TEST_DESCRIPTION',
  coverPhoto: {
    originalUrl: 'TEST_LINK_ORIGINAL',
    coverUrl: 'TEST_LINK_COVER'
  },
  position: 0,
  files: { nodes: [] },
  skills: {
    nodes: skills
  }
})

const arrangeTest = (item: TalentPortfolioItemFragment) => {
  render(
    <TestWrapper>
      <PortfolioItemWithImage item={item} hasTalentDesignerRole />
    </TestWrapper>
  )
}

describe('PortfolioItemWithImage', () => {
  it('renders portfolio item with cover image', () => {
    const portfolioItem = createPortolioItemData()

    arrangeTest(portfolioItem)

    expect(screen.getByTestId('portfolio-cover-image')).toBeInTheDocument()
    expect(screen.getByTestId('portfolio-cover-image')).toHaveAttribute(
      'src',
      portfolioItem.coverPhoto?.coverUrl
    )
  })

  it('renders skills as tags when publicUrl is null', () => {
    const skill = {
      id: '12343345',
      name: 'TEST_NAME'
    }
    const portfolioItem = createPortolioItemData({ skills: [skill] })

    arrangeTest(portfolioItem)

    expect(screen.getByTestId('skill-tag')).toBeInTheDocument()
    expect(screen.getByTestId('skill-tag')).not.toHaveAttribute('href')
  })

  it('renders skills as links when publicUrl is available', () => {
    const skillUrl = 'TEST_LINK'
    const skill = {
      id: '12343345',
      name: 'TEST_NAME',
      skillPage: {
        publicUrl: skillUrl
      }
    }
    const portfolioItem = createPortolioItemData({ skills: [skill] })

    arrangeTest(portfolioItem)

    expect(screen.getByTestId('skill-tag-link')).toBeInTheDocument()
    expect(screen.getByTestId('skill-tag-link')).toHaveAttribute(
      'href',
      skillUrl
    )
  })

  it('shows the portfolio skills in the right order with links (when applicable)', () => {
    const SKILL_1 = {
      id: 'aa',
      name: 'UX',
      skillPage: {
        publicUrl: 'TEST_LINK'
      }
    }
    const SKILL_2 = {
      id: 'bb',
      name: 'Visual Design',
      skillPage: {
        publicUrl: 'TEST_LINK'
      }
    }
    const SKILL_3 = { id: 'cc', name: 'Mobile Apps', skillPage: null }

    const skills = [SKILL_1, SKILL_2, SKILL_3]

    const portfolioItem = createPortolioItemData({
      skills
    })

    arrangeTest(portfolioItem)

    const skillTags = screen.getAllByTestId('skill-tag')
    const skillTagLinks = screen.getAllByTestId('skill-tag-link')

    expect(skillTags).toHaveLength(3)
    expect(within(skillTags[0]).getByText(SKILL_1.name)).toBeInTheDocument()
    expect(within(skillTags[1]).getByText(SKILL_2.name)).toBeInTheDocument()
    expect(within(skillTags[2]).getByText(SKILL_3.name)).toBeInTheDocument()

    expect(skillTagLinks).toHaveLength(2)
    expect(skillTagLinks[0]).toHaveAttribute(
      'href',
      SKILL_1.skillPage.publicUrl
    )
    expect(skillTagLinks[1]).toHaveAttribute(
      'href',
      SKILL_2.skillPage.publicUrl
    )
  })
})

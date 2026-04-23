import React, { ReactNode, RefObject } from 'react'
import { Container, Typography, Accordion } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { SimpleHtmlFormatter } from '@staff-portal/string'

import { TalentPortfolioItemFragment } from '../../../../data/talent-portfolio-item-fragment'
import * as S from './styles'

type Props = {
  portfolioItem: TalentPortfolioItemFragment
  expanded: boolean
  handleSummaryClick: () => void
  scrollContainerRef: RefObject<HTMLDivElement>
  children?: ReactNode
}

const ProjectSummary = ({
  portfolioItem,
  children,
  expanded,
  handleSummaryClick,
  scrollContainerRef
}: Props) => {
  const skills = portfolioItem.skills?.nodes.map(skill => skill.name).join(', ')
  const url = portfolioItem.link
  const description = portfolioItem.description

  const content = (
    <Container>
      {skills && (
        <Typography color='grey' size='xsmall'>
          {skills}
        </Typography>
      )}
      {url && (
        <Container top='small'>
          <Link target='_blank' href={url}>
            <Typography color='grey' size='medium' weight='semibold'>
              {url}
            </Typography>
          </Link>
        </Container>
      )}
      {description && (
        <Typography as='div' size='medium'>
          <SimpleHtmlFormatter text={description} />
        </Typography>
      )}
    </Container>
  )

  return (
    <Container
      padded='large'
      bottom={20}
      css={S.summaryContainer}
      ref={scrollContainerRef}
    >
      <Container flex css={S.summaryItems}>
        <Accordion
          defaultExpanded
          content={content}
          borders='none'
          css={S.accordion}
          expanded={expanded}
          onClick={handleSummaryClick}
        >
          <Accordion.Summary>
            <Typography variant='heading' size='small'>
              {portfolioItem.title}
            </Typography>
          </Accordion.Summary>
        </Accordion>
        {children}
      </Container>
    </Container>
  )
}

export default ProjectSummary

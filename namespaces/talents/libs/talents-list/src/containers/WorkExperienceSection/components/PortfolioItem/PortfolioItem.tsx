import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { PortfolioItemKindEnum } from '@staff-portal/graphql/staff'
import { TalentWorkExperiencePortfolioItemFragment } from '@staff-portal/talents'

const TALENT_PORTFOLIO_TYPE: Record<PortfolioItemKindEnum, string> = {
  [PortfolioItemKindEnum.ACCOMPLISHMENT]: 'Accomplishment',
  [PortfolioItemKindEnum.BASIC]: 'Development',
  [PortfolioItemKindEnum.CLASSIC]: 'Design',
  [PortfolioItemKindEnum.CODE_BASE]: 'Code base',
  [PortfolioItemKindEnum.OTHER_AMAZING_THINGS]: 'Other amazing things'
}

interface Props {
  item: TalentWorkExperiencePortfolioItemFragment
}

const PortfolioItem = ({ item }: Props) => {
  return (
    <Container key={item.id} bottom='small'>
      <Typography size='medium' variant='heading'>
        {item.title} ({TALENT_PORTFOLIO_TYPE[item.kindEnum]})
      </Typography>
      {item.link && (
        <Typography size='medium'>
          <Link href={item.link} target='_blank'>
            {item.link}
          </Link>
        </Typography>
      )}
      <Typography size='medium'>{item.description}</Typography>
    </Container>
  )
}

export default PortfolioItem

import React from 'react'
import { Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { NO_VALUE } from '@staff-portal/config'

import { TalentPortfolioUrlFragment } from './data/talent-portfolio-url-fragment'

type Props = {
  portfolioUrlData: TalentPortfolioUrlFragment['portfolio']
}

const TalentPortfolioUrlField = ({ portfolioUrlData }: Props) => {
  const url = portfolioUrlData?.url

  if (!url) {
    return <>{NO_VALUE}</>
  }

  return (
    <Link href={url} data-testid='profile-url' target='_blank'>
      <Typography as='span' size='medium' weight='semibold' color='inherit'>
        {url}
      </Typography>
    </Link>
  )
}

export default TalentPortfolioUrlField

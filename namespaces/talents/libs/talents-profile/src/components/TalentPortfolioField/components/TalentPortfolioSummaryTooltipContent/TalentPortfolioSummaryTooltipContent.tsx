import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { MarkdownWithHtml } from '@staff-portal/ui'

import * as S from './styles'
import { TalentPortfolioVoteFragment } from '../../data/talent-portfolio-fragment'

type Props = {
  voterName: TalentPortfolioVoteFragment['voter']['fullName']
  voterComment: TalentPortfolioVoteFragment['comment']
}

const TalentPortfolioSummaryTooltipContent = ({
  voterName,
  voterComment
}: Props) => {
  return (
    <Container css={S.tooltipContainer}>
      <Typography weight='semibold'>{voterName}</Typography>
      {voterComment ? (
        <Typography as='div'>
          <MarkdownWithHtml allowDangerousHtml>
            {voterComment || ''}
          </MarkdownWithHtml>
        </Typography>
      ) : null}
    </Container>
  )
}

export default TalentPortfolioSummaryTooltipContent

import React from 'react'
import { LinkWrapper } from '@staff-portal/ui'
import { DEFAULT_DATE_FORMAT, parseAndFormatDate } from '@staff-portal/date-time-utils'

import { TaskCardCompanyNpsScoreFragment } from '../../data/company-task-card-fragment'

export const getCompanyNpsScore = ({
  lastAnsweredPromotion,
  promotions
}: Pick<
  TaskCardCompanyNpsScoreFragment,
  'promotions' | 'lastAnsweredPromotion'
>) => {
  const url = promotions?.webResource?.url

  if (!lastAnsweredPromotion?.score || !lastAnsweredPromotion?.updatedAt) {
    return
  }

  const { score, updatedAt } = lastAnsweredPromotion

  return (
    <LinkWrapper wrapWhen={Boolean(url)} href={url as string}>
      {score} (
      {parseAndFormatDate(updatedAt, {
        dateFormat: DEFAULT_DATE_FORMAT
      })}
      )
    </LinkWrapper>
  )
}

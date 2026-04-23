import React from 'react'
import { Container, Typography, Tooltip } from '@toptal/picasso'
import { DetailedListItems, DetailedList } from '@staff-portal/ui'
import { isNotNullish } from '@staff-portal/utils'

import { FeedbackStatsEntryFragment } from '../../data/get-talent-feedback-stats'
import * as S from './styles'

interface Props {
  entry: FeedbackStatsEntryFragment
}

const sortItems = (items: DetailedListItems) => {
  const result = []

  for (let index = 0; index < items.length; index += 2) {
    result.push([items[index], items[index + 1]].filter(isNotNullish))
  }

  return result as DetailedListItems
}

const TalentFeedbackStatsEntry = ({
  entry: {
    roleTitle,
    answers: { nodes, totalCount }
  }
}: Props) => {
  const items: DetailedListItems = nodes.map(({ label, tooltip, score }) => {
    return {
      label: (
        <Tooltip content={tooltip}>
          <Typography as='span' size='medium'>
            {label}
          </Typography>
        </Tooltip>
      ),
      value: (
        <Typography as='span' size='medium' weight='semibold'>
          {score}%
        </Typography>
      )
    }
  })

  const sortedItems = sortItems(items)

  return (
    <Container bottom='medium' css={S.entryItem}>
      <Typography size='small' variant='heading'>
        {`${roleTitle} (out of ${totalCount})`}
      </Typography>
      <Container top='small'>
        {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
        <DetailedList items={sortedItems} labelColumnWidth={12} />
      </Container>
    </Container>
  )
}

export default TalentFeedbackStatsEntry

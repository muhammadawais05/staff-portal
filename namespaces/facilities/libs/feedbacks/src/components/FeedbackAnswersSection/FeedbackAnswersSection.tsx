import { Container, Typography } from '@toptal/picasso'
import React, { ReactNode } from 'react'
import { DetailedList } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'

import { FeedbackAnswerFragment } from '../../data'
import { getFeedbackAnswersContentItem } from './utils'

export interface Props {
  title: string
  answers?: FeedbackAnswerFragment[]
  labelColumnWidth?: number
  actionButton?: ReactNode
}

const FeedbackAnswersSection = ({
  title,
  answers,
  labelColumnWidth,
  actionButton
}: Props) => {
  return (
    <>
      <Container
        flex
        top='medium'
        bottom='small'
        justifyContent='space-between'
      >
        <Typography variant='heading' size='small'>
          {title}
        </Typography>

        {actionButton}
      </Container>

      {!!answers?.length && (
        // eslint-disable-next-line @toptal/davinci/no-deprecated-props
        <DetailedList
          columns={2}
          labelColumnWidth={labelColumnWidth}
          defaultValue={NO_VALUE}
          items={getFeedbackAnswersContentItem({ answers })}
        />
      )}
    </>
  )
}

export default FeedbackAnswersSection

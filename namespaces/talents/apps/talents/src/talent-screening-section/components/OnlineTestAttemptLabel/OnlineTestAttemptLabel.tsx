import { Container, Time16, Tooltip, Typography } from '@toptal/picasso'
import React, { useMemo } from 'react'

import { OnlineTestAttemptsFragment } from '../ClaimOnlineTestStepModal/data/get-online-test-data/get-online-test-data.staff.gql.types'
import OnlineTestAttemptTooltipContent from '../OnlineTestAttemptTooltipContent'
import { getOnlineTestAttemptColor } from './utils'
import * as S from './styles'

export interface Props {
  onlineTestAttempt: OnlineTestAttemptsFragment
}

const OnlineTestAttemptLabel = ({ onlineTestAttempt }: Props) => {
  const { test, finishedAt, createdAt, pureScore, maxScore } = onlineTestAttempt
  const prefix = finishedAt ? 'Track' : 'Track pending'
  const testName = test?.name ?? 'Unknown test'

  const relativeScore = useMemo(
    () => [pureScore, maxScore].filter(Boolean).join('/'),
    [maxScore, pureScore]
  )

  return (
    <Tooltip
      interactive
      content={
        <OnlineTestAttemptTooltipContent
          createdAt={createdAt}
          finishedAt={finishedAt ?? undefined}
        />
      }
    >
      <Container flex alignItems='center'>
        <Typography>
          {prefix}{' '}
          {relativeScore && (
            <Typography
              as='span'
              color={getOnlineTestAttemptColor(onlineTestAttempt)}
            >
              {relativeScore}{' '}
            </Typography>
          )}
          test "{testName}"
        </Typography>

        <Container flex alignItems='center' left='xsmall'>
          <Time16 css={S.helpCursor} />
        </Container>
      </Container>
    </Tooltip>
  )
}

export default OnlineTestAttemptLabel

import React, { useMemo } from 'react'
import {
  Typography,
  Container,
  CheckSolid16,
  Close16,
  Tooltip
} from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'

import * as S from './styles'
import { CandidateJobEngagementFeedbackFragment } from '../../data/get-candidate-jobs/get-candidate-jobs.staff.gql.types'

export interface Props {
  clientFeedback: CandidateJobEngagementFeedbackFragment[]
}

const renderValue = (value?: string | null) => {
  if (!value) {
    return NO_VALUE
  } else if (value === 'Yes') {
    return <CheckSolid16 color='green' />
  } else if (value === 'No') {
    return <Close16 color='red' />
  }

  return (
    <Typography size='small' align='right' weight='regular'>
      {value}
    </Typography>
  )
}

const ClientFeedback = ({ clientFeedback }: Props) => {
  const items = useMemo(() => {
    if (!clientFeedback?.length) {
      return []
    }

    return clientFeedback[0].clientAnswers.nodes.map(clientAnswer => ({
      label: (
        <Tooltip content={clientAnswer.tooltip}>
          <div css={S.tooltipText}>{clientAnswer.option?.question.label}</div>
        </Tooltip>
      ),
      value: (
        <Container
          flex
          alignItems='flex-end'
          justifyContent='flex-end'
          right='medium'
        >
          <Container css={S.valueField} flex justifyContent='center'>
            {renderValue(clientAnswer.option?.value)}
          </Container>
        </Container>
      )
    }))
  }, [clientFeedback])

  return (
    <Container data-testid='client-feedback'>
      <Typography size='medium' color='dark-grey' weight='semibold'>
        Client Feedback
      </Typography>
      <Container>
        {items.length > 0 ? (
          // eslint-disable-next-line @toptal/davinci/no-deprecated-props
          <DetailedList
            items={items}
            columns={2}
            defaultValue={NO_VALUE}
            typographySize='xsmall'
            labelColumnWidth={16}
          />
        ) : (
          <Typography size='small'>
            There is no client feedback for this engagement.
          </Typography>
        )}
      </Container>
    </Container>
  )
}

export default ClientFeedback

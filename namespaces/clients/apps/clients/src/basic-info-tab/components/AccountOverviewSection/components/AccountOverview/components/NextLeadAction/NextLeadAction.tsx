import React from 'react'
import {
  Container,
  Tooltip,
  QuestionMark16,
  TypographyOverflow
} from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'

export type Props = {
  status?: string | null
  comment?: string | null
}

const NextLeadAction = ({ status, comment }: Props) => {
  return (
    <Container flex alignItems='center'>
      <TypographyOverflow size='medium' data-testid='NextLeadAction-status'>
        {status || NO_VALUE}
      </TypographyOverflow>

      {comment && (
        <Tooltip interactive content={comment}>
          <Container as='span' flex alignItems='center' left='xsmall'>
            <QuestionMark16
              data-testid='NextLeadAction-icon'
              color='dark-grey'
            />
          </Container>
        </Tooltip>
      )}
    </Container>
  )
}

export default NextLeadAction

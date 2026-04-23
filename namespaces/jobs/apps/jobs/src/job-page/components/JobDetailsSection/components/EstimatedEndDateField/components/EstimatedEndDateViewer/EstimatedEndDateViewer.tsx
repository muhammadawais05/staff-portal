import React from 'react'
import { Container, Info16, Tooltip, Typography } from '@toptal/picasso'
import { Maybe, Operation } from '@staff-portal/graphql/staff'
import { OperationTooltipContent } from '@staff-portal/operations'
import { useUserDateFormatter } from '@staff-portal/current-user'

interface Props {
  estimatedEndDate?: Maybe<string>
  operation: Operation | undefined
}

const EstimatedEndDateViewer = ({ estimatedEndDate, operation }: Props) => {
  const formatUserDate = useUserDateFormatter()

  return (
    <Container
      as='span'
      flex
      alignItems='center'
      data-testid='estimated-end-date'
    >
      <Container as='span' right='xsmall'>
        <Typography size='medium'>
          {estimatedEndDate
            ? formatUserDate(estimatedEndDate)
            : 'Not specified'}
        </Typography>
      </Container>

      {operation && operation.messages.length > 0 && (
        <Tooltip
          interactive
          content={<OperationTooltipContent messages={operation.messages} />}
        >
          <Container as='span' right='xsmall'>
            <Info16 />
          </Container>
        </Tooltip>
      )}
    </Container>
  )
}

export default EstimatedEndDateViewer

import { Container, Tooltip, Typography, QuestionMark16 } from '@toptal/picasso'
import React, { useMemo } from 'react'

export const SkypeAdditionalIdsTooltip = ({
  additionalSkypeIds
}: {
  additionalSkypeIds: string[]
}) => {
  const tooltipContent = useMemo(
    () => (
      <>
        <Typography>Also used:</Typography>
        {additionalSkypeIds.map(additionalSkypeId => (
          <Typography key={additionalSkypeId}>{additionalSkypeId}</Typography>
        ))}
      </>
    ),
    [additionalSkypeIds]
  )

  if (!additionalSkypeIds.length) {
    return null
  }

  return (
    <Tooltip interactive content={tooltipContent}>
      <Container flex left='xsmall' data-testid='additional-skype-ids'>
        <QuestionMark16 />
      </Container>
    </Tooltip>
  )
}

export default SkypeAdditionalIdsTooltip

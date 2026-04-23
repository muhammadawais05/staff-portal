import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { CheckMinor16, CloseMinor16 } from '@toptal/picasso/Icon'

export interface ValidationMessageProps {
  message: string
  hasErrors: boolean
  requirementMeet: boolean
}

const ValidationMessage = ({
  message,
  hasErrors,
  requirementMeet
}: ValidationMessageProps) => {
  let textColor: 'green' | 'red' | 'black'
  let iconColor: 'green' | 'red' | 'black'

  if (requirementMeet) {
    textColor = 'black'
    iconColor = 'green'
  } else if (hasErrors) {
    textColor = 'red'
    iconColor = 'red'
  } else {
    textColor = 'black'
    iconColor = 'black'
  }

  return (
    <Container flex direction='row' right='xsmall' alignItems='flex-start'>
      <Container right='xsmall' top={0.125}>
        {requirementMeet ? (
          <CheckMinor16
            color={iconColor}
            data-testid={`${iconColor}-check-icon`}
          />
        ) : (
          <CloseMinor16
            color={iconColor}
            data-testid={`${iconColor}-close-icon`}
          />
        )}
      </Container>
      <Typography
        variant='body'
        size='medium'
        color={textColor}
        data-testid={`${textColor}-message`}
      >
        {message}
      </Typography>
    </Container>
  )
}

export default ValidationMessage

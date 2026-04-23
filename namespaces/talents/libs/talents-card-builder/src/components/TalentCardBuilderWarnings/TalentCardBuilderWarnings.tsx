import { Alert, Container, Typography } from '@toptal/picasso'
import { useFormState } from '@toptal/picasso-forms'
import React, { useMemo } from 'react'

import {
  CardValidationContext,
  getCardPossibleErrors
} from '../../utils/validateCard'
import ValidationMessage from '../ValidationMessage'
import * as S from './styles'

interface TalentCardBuilderWarningsProps {
  isEditing: boolean
  validationContext: CardValidationContext
}

const TalentCardBuilderWarnings = ({
  isEditing,
  validationContext
}: TalentCardBuilderWarningsProps) => {
  const allValidationErrors = useMemo(
    () => getCardPossibleErrors(validationContext),
    [validationContext]
  )

  const { errors, values } = useFormState({
    subscription: { errors: true, values: true }
  })

  const { submissionAttempted } = values

  const cardErrors = useMemo(() => errors?.card ?? [], [errors?.card])

  const validations = useMemo(
    () =>
      allValidationErrors.map(error => ({
        message: error.message,
        requirementMeet: !cardErrors.includes(error.message)
      })),
    [cardErrors, allValidationErrors]
  )

  const variant =
    cardErrors.length > 0
      ? submissionAttempted && !isEditing
        ? 'red'
        : 'yellow'
      : 'green'
  const hasErrors = variant === 'red'

  return (
    <Container bottom='small' css={S.svgItem}>
      <Alert variant={variant}>
        <Container flex direction='row'>
          <Container flex direction='column'>
            <Typography variant='body' size='medium' color='black'>
              {hasErrors
                ? 'Please review your profile card and make sure it is aligned with job requirements.'
                : 'Please make sure to meet the application card requirements aligned with job requirements:'}
            </Typography>

            <Container flex top='xsmall' direction='column'>
              {validations.map(({ message, requirementMeet }) => (
                <ValidationMessage
                  key={message}
                  message={message}
                  hasErrors={hasErrors}
                  requirementMeet={requirementMeet}
                />
              ))}
            </Container>
          </Container>
        </Container>
      </Alert>
    </Container>
  )
}

export default TalentCardBuilderWarnings

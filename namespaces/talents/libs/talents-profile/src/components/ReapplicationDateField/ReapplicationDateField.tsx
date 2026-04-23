import { Container, Info16, Tooltip, Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import React, { useMemo } from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { NO_VALUE } from '@staff-portal/config'
import { Maybe, Operation, Scalars } from '@staff-portal/graphql/staff'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import {
  isOperationDisabled,
  isOperationHidden,
  OperationTooltipContent
} from '@staff-portal/operations'
import { Editable, InlineDate } from '@staff-portal/editable'
import { MutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { DatePickerValue } from '@staff-portal/ui'

import { useUpdateTalentReapplicationDate } from './data/update-talent-reapplication-date'
import { useResetTalentReapplicationDate } from './data/reset-talent-reapplication-date'

interface Props {
  talentId: string
  date?: Maybe<Scalars['Date']>
  operation: Operation
}

const ERROR_MESSAGE = 'Unable to update reapplication date.'

const ReapplicationDateField = ({ talentId, date, operation }: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => new Date(), [])

  const showErrorMessage = () => showError(ERROR_MESSAGE)

  const onCompleted = (result?: Maybe<MutationResult>) => {
    if (result?.success) {
      emitMessage(TALENT_UPDATED, { talentId })

      return
    }

    if (result?.errors) {
      showError(concatMutationErrors(result?.errors, ERROR_MESSAGE))

      return
    }

    showErrorMessage()
  }

  const [updateTalentReapplicationDate, { loading: updateIsLoading }] =
    useUpdateTalentReapplicationDate({
      onError: showErrorMessage,
      onCompleted: ({ updateTalentReapplicationDate: result }) =>
        onCompleted(result)
    })

  const [resetTalentReapplicationDate, { loading: resetIsLoading }] =
    useResetTalentReapplicationDate({
      onError: showErrorMessage,
      onCompleted: ({ resetTalentReapplicationDate: result }) =>
        onCompleted(result)
    })

  const handleChange = (newDate?: DatePickerValue) => {
    const reapplicationDate = typeof newDate === 'string' ? newDate : null

    if (date === reapplicationDate) {
      return
    }

    if (reapplicationDate) {
      updateTalentReapplicationDate({
        variables: {
          input: { talentId, reapplicationDate }
        }
      })

      return
    }

    resetTalentReapplicationDate({
      variables: {
        input: { talentId }
      }
    })
  }

  const disabled =
    isOperationDisabled(operation) || isOperationHidden(operation)

  const { messages } = operation

  const tooltip = messages.length > 0 && (
    <Tooltip
      interactive
      content={<OperationTooltipContent messages={messages} />}
    >
      <Container flex left='xsmall'>
        <Info16 data-testid='ReapplicationDate-tooltip' />
      </Container>
    </Tooltip>
  )

  return (
    <Container flex as='span' alignItems='center' inline>
      <Editable<Scalars['Date'] | null>
        disabled={disabled}
        loading={updateIsLoading || resetIsLoading}
        value={date}
        onChange={handleChange}
        updateOnBlur
        editor={props => (
          <InlineDate
            size='small'
            minDate={minDate}
            width='shrink'
            enableReset
            {...props}
          />
        )}
        viewer={
          <Typography weight='semibold' size='medium'>
            {date ? parseAndFormatDate(date) : NO_VALUE}
          </Typography>
        }
      />
      {tooltip}
    </Container>
  )
}

export default ReapplicationDateField

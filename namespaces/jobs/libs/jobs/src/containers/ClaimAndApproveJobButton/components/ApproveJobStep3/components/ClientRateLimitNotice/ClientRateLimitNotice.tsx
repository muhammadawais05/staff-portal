import { Helpbox, Button } from '@toptal/picasso'
import React from 'react'
import { formatAmount } from '@toptal/picasso/utils'
import { useField } from '@toptal/picasso-forms'

import { ApproveJobForm } from '../../../../types'

export interface Props {
  navigateToStep1: () => void
}

const ClientRateLimitNotice = ({ navigateToStep1 }: Props) => {
  const {
    input: { value: maxHourlyRate }
  } = useField<ApproveJobForm['maxHourlyRate']>('maxHourlyRate')
  const maxHourlyRateFormatted =
    maxHourlyRate && formatAmount({ amount: maxHourlyRate })

  return (
    <Helpbox variant='yellow'>
      <Helpbox.Content>
        {maxHourlyRate && (
          <>
            Client rate limit is set to {maxHourlyRateFormatted}/h, so that any
            talent above {maxHourlyRateFormatted}/h will be warned that their
            rate is higher than client budget automatically.
          </>
        )}

        {!maxHourlyRate && (
          <>
            Please add the client rate limit so that talent above the budget
            will be warned automatically.{' '}
            <Button.Action
              onClick={navigateToStep1}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              titleCase={false}
            >
              Set up rate limit
            </Button.Action>
          </>
        )}
      </Helpbox.Content>
    </Helpbox>
  )
}

export default ClientRateLimitNotice

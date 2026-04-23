import React, { useMemo } from 'react'
import {
  Maybe,
  Operation,
  TimeZone,
  Scalars,
  UpdateTalentSigningBonusDeadlineInput
} from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { NO_VALUE } from '@staff-portal/config'

import SignOnBonusIcon from './components/SignOnBonusIcon/SignOnBonusIcon'
import { UpdateTalentSigningBonusDeadlineDocument } from './data/update-talent-signing-bonus-deadline/update-talent-signing-bonus-deadline.staff.gql.types'
import { getTalentSignOnBonusHook } from './utils/get-sign-on-bonus-hook'

interface Props {
  talentId: string
  predictedTimeZone?: Maybe<Partial<TimeZone>>
  date?: Maybe<Scalars['Time']>
  operation: Operation
}

const SignOnBonusField = ({
  talentId,
  date,
  operation,
  predictedTimeZone
}: Props) => {
  const formatUserDate = useUserDateFormatter()
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => new Date(), [])

  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: UpdateTalentSigningBonusDeadlineDocument,
    requiredValues: { talentId },
    // TODO: use helper to convert Scalars['Time'] to Scalars['Date']
    initialValues: { signingBonusDeadline: (date as Scalars['Date']) ?? '' },
    mutationResultOptions: {
      successMessageEmitOptions: {
        type: TALENT_UPDATED,
        payload: { talentId }
      }
    }
  })

  const parsedDate = formatUserDate(date)

  if (!date) {
    return null
  }

  return (
    <EditableField<
      Pick<UpdateTalentSigningBonusDeadlineInput, 'signingBonusDeadline'>,
      Scalars['Date'] | null | undefined
    >
      name='signingBonusDeadline'
      queryValue={getTalentSignOnBonusHook(talentId)}
      disabled={!isOperationEnabled(operation)}
      onChange={handleChange}
      // TODO: use helper to convert Scalars['Time'] to Scalars['Date']
      value={date as Scalars['Date']}
      viewer={parsedDate || NO_VALUE}
      updateOnBlur
      icon={
        <SignOnBonusIcon date={date} predictedTimeZone={predictedTimeZone} />
      }
      editor={props => (
        <FormDatePickerWrapper
          {...props}
          size='small'
          required
          autoFocus
          minDate={minDate}
        />
      )}
    />
  )
}

export default SignOnBonusField

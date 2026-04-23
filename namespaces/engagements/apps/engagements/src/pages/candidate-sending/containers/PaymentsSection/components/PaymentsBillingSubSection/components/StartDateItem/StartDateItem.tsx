import React from 'react'
import { DetailedList as DL } from '@staff-portal/ui'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { getRoleTypeText } from '@staff-portal/facilities'

import { useCandidateSendingContext } from '../../../../../../hooks'
import { LabelRequiredPrefix } from '../../../../../../components'
import * as S from '../../../../../../styles'

type Props = {
  talentType: string
}

const StartDateItem = ({ talentType }: Props) => {
  const { stepsAttributes } = useCandidateSendingContext()
  const roleTypeText = getRoleTypeText(talentType).toLowerCase()

  if (!stepsAttributes.hasPendingAssignment) {
    return null
  }

  return (
    <DL.Row>
      <DL.Item
        multilines
        label={
          <>
            <LabelRequiredPrefix />
            {`When did ${roleTypeText} start working on this engagement?`}
          </>
        }
      >
        <FormDatePickerWrapper
          name='startDate'
          width='full'
          css={S.formFieldWidth}
          required
        />
      </DL.Item>
    </DL.Row>
  )
}

export default StartDateItem

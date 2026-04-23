import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { Maybe } from '@staff-portal/graphql/staff'

import LabelRequiredPrefix from '../../../LabelRequiredPrefix/LabelRequiredPrefix'
import { getTrialLengthOptions } from '../../../../utils/get-trial-length-options'
import * as S from '../../../../styles'

export type Props = {
  hasPendingAssignment?: Maybe<boolean>
}

const TrialPeriodItem = ({ hasPendingAssignment }: Props) => {
  const trialLengthOptions = getTrialLengthOptions()
  const trialPeriodLabel = hasPendingAssignment
    ? 'How long was trial period for this engagement?'
    : 'How long will trial period be?'

  return (
    <DetailedList.Row css={S.centerItemAlign}>
      <DetailedList.Item
        label={
          <>
            <LabelRequiredPrefix />
            {trialPeriodLabel}
          </>
        }
      >
        <Form.Select
          css={S.formFieldWidth}
          required
          name='trialLength'
          options={trialLengthOptions}
        />
      </DetailedList.Item>
    </DetailedList.Row>
  )
}

export default TrialPeriodItem

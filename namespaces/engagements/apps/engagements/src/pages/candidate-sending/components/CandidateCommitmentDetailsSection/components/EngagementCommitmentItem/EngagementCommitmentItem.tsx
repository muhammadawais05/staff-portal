import React, { useCallback, useMemo } from 'react'
import { DetailedList } from '@staff-portal/ui'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { Form } from '@toptal/picasso-forms'

import * as S from '../../../../styles'
import { convertObjectToSelectOptions } from '../../../../utils'
import { ENGAGEMENT_COMMITMENT_MAPPING } from '../../../../config'

export type Props = {
  onCommitmentChange: (commitment?: EngagementCommitmentEnum) => void
}

const EngagementCommitmentItem = ({ onCommitmentChange }: Props) => {
  const commitmentOptions = useMemo(
    () =>
      convertObjectToSelectOptions<EngagementCommitmentEnum>(
        ENGAGEMENT_COMMITMENT_MAPPING
      ),
    []
  )

  const handleCommitmentChange = useCallback(
    (event: React.ChangeEvent<{ value?: EngagementCommitmentEnum }>) => {
      onCommitmentChange(event.target.value)
    },
    [onCommitmentChange]
  )

  return (
    <DetailedList.Row css={S.centerItemAlign}>
      <DetailedList.Item label='Engagement commitment'>
        <Form.Select<EngagementCommitmentEnum>
          css={S.formFieldWidth}
          required
          name='commitment'
          options={commitmentOptions}
          onChange={handleCommitmentChange}
        />
      </DetailedList.Item>
    </DetailedList.Row>
  )
}

export default EngagementCommitmentItem

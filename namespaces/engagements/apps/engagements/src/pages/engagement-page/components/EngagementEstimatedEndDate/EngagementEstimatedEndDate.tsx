import { Container } from '@toptal/picasso'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React, { useMemo } from 'react'
import { ProposeEngagementEndInput, Scalars } from '@staff-portal/graphql/staff'
import { ExpandButton } from '@staff-portal/ui'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { isOperationEnabled, OperationFragment } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'

import { ProposeEngagementEstimateEndDateDocument } from './data'
import {
  getLazyEngagementProposeEndDateHook,
  useGetFormattedEstimatedDate
} from './hooks'
import { isEstimatedDateChanged } from './utils'

export interface Props {
  engagementId: string
  date?: Scalars['Date']
  operation: OperationFragment
  isHistoryVisible: boolean
  setHistoryVisibility: (visible: boolean) => void
  onChange: () => void
}

const EngagementEstimatedEndDate = ({
  engagementId,
  date,
  operation,
  isHistoryVisible,
  setHistoryVisibility,
  onChange
}: Props) => {
  const emitMessage = useMessageEmitter()
  const mutationValue = date ?? ''
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => new Date(), [])

  const queryValue = getLazyEngagementProposeEndDateHook(engagementId)
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: ProposeEngagementEstimateEndDateDocument,
    initialValues: { endDate: mutationValue },
    requiredValues: { engagementId },
    isValueChanged: isEstimatedDateChanged,
    onCompleted: data => {
      if (data.proposeEngagementEnd?.success) {
        onChange()
        emitMessage(ENGAGEMENT_UPDATED, { engagementId })
      }
    }
  })

  const isEditableFieldDisabled = !isOperationEnabled(operation)
  const formattedEstimatedDate = useGetFormattedEstimatedDate(date)

  return (
    <Container
      flex
      alignItems='center'
      justifyContent='space-between'
      data-testid='EngagementEstimatedEndDate'
    >
      <EditableField<ProposeEngagementEndInput, Scalars['Date'] | null>
        value={date || null}
        name='endDate'
        disabled={isEditableFieldDisabled}
        updateOnBlur
        queryValue={queryValue}
        viewer={formattedEstimatedDate}
        editor={props => (
          <FormDatePickerWrapper
            {...props}
            autoFocus
            minDate={minDate}
            enableReset={false}
            hideOnSelect
            size='small'
          />
        )}
        onChange={handleChange}
      />

      <ExpandButton
        expanded={isHistoryVisible}
        onClick={setHistoryVisibility}
      />
    </Container>
  )
}

export default EngagementEstimatedEndDate

import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { Maybe, UpdateOpportunityInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'
import useOpportunityWorkTypeOptions from '../../utils/use-opportunity-work-type-options'

interface Props {
  opportunityId: string
  updateOpportunityDisabled: boolean
  workType: Maybe<string> | undefined
  onChange: (key: keyof UpdateOpportunityInput, values: AnyObject) => void
}

const OpportunityDetailsWorkType = ({
  opportunityId,
  updateOpportunityDisabled,
  workType,
  onChange
}: Props) => {
  const { opportunityWorkTypeOptions, loading: workTypesLoading } =
    useOpportunityWorkTypeOptions()

  return (
    <EditableField<UpdateOpportunityInput>
      disabled={updateOpportunityDisabled}
      name='workType'
      multiline
      onChange={onChange}
      value={workType?.toString() ?? undefined}
      queryValue={getOpportunityValueHook(opportunityId, 'workType')}
      viewer={workType?.toString() || NO_VALUE}
      updateOnBlur
      editor={props => (
        <Form.Select
          {...props}
          autoFocus
          size='small'
          width='full'
          options={opportunityWorkTypeOptions}
          loading={workTypesLoading}
        />
      )}
    />
  )
}

export default OpportunityDetailsWorkType

import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { InvestigationReason } from '@staff-portal/graphql/staff'

import { RESOLVE_INVESTIGATION_RESOLUTIONS_OPTIONS } from '../../config'

type Props = {
  investigationReason: InvestigationReason
}

const InvestigationReasonInput = ({ investigationReason }: Props) => {
  if (investigationReason === InvestigationReason.OTHER) {
    return (
      <Form.Input
        name='resolution'
        label='Resolution'
        width='full'
        rowsMin={4}
        rowsMax={10}
        data-testid='InvestigationResolve-resolution-textarea'
        multiline
        required
      />
    )
  }

  return (
    <Form.Select
      name='resolution'
      label='Resolution'
      width='full'
      options={RESOLVE_INVESTIGATION_RESOLUTIONS_OPTIONS[investigationReason]}
      autoFocus
      data-testid='InvestigationResolve-resolution-select'
      required
    />
  )
}

export default InvestigationReasonInput

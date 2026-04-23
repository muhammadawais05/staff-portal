import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { CompanyAction } from '@staff-portal/graphql/staff'

import { COMMUNICATION_NOTE_COMPANY_ACTIONS_LABEL_MAPPING } from '../../config'

export interface Props {
  actions?: CompanyAction[]
}

const NoteFormCompanyActions = ({ actions }: Props) => {
  if (!actions?.length) {
    return null
  }

  return (
    <Form.RadioGroup name='companyAction' horizontal>
      {actions.map(action => (
        <Form.Radio
          key={action}
          titleCase={false}
          label={COMMUNICATION_NOTE_COMPANY_ACTIONS_LABEL_MAPPING[action]}
          value={action}
        />
      ))}
    </Form.RadioGroup>
  )
}

export default NoteFormCompanyActions

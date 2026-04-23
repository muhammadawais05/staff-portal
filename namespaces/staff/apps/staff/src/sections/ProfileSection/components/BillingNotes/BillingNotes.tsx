import React from 'react'
import { EditableField, EditableTextarea } from '@staff-portal/editable'
import { MultilineTextViewer } from '@staff-portal/ui'
import { isOperationEnabled, OperationFragment } from '@staff-portal/operations'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { getLazyBillingNotesHook } from './data/get-billing-notes'
import { UpdateBillingNotesDocument } from './data/set-update-billing-notes/set-update-billing-notes.staff.gql.types'

interface Props {
  staffId: string
  billingNotes?: string | null
  operation: OperationFragment
}

const BillingNotes = ({ staffId, billingNotes, operation }: Props) => {
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: UpdateBillingNotesDocument,
    initialValues: {
      billingNotes: billingNotes || ''
    },
    requiredValues: {
      roleOrClientId: staffId
    }
  })

  return (
    <EditableField
      disabled={!isOperationEnabled(operation)}
      queryValue={getLazyBillingNotesHook(staffId)}
      onChange={handleChange}
      value={billingNotes}
      name='billingNotes'
      multiline
      fullWidthEditor
      viewer={<MultilineTextViewer value={billingNotes} />}
      editor={props => <EditableTextarea {...props} required />}
    />
  )
}

export default BillingNotes

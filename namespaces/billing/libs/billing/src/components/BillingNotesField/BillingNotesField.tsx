import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Operation as GQLOperation, UpdateBillingNotesInput} from '@staff-portal/graphql/staff'
import { SimpleHtmlFormatter } from '@staff-portal/string'
import { EditableField, EditableTextarea } from '@staff-portal/editable'
import {
  useEditableFieldChangeHandler
} from '@staff-portal/mutation-result-handlers'
import { NO_VALUE } from '@staff-portal/config'
import { isOperationEnabled } from '@staff-portal/operations';
import { PayloadOf, TypedMessage } from '@toptal/staff-portal-message-bus';

import { UpdateBillingNotesDocument } from './data/update-billing-notes'
import * as S from './styles'
import { getBillingNotesHook } from './utils/get-billing-notes-hook'

interface Props {
  roleOrClientId: string
  billingNotes?: string
  operation: GQLOperation
  mutationResultOptions?: {
    successNotificationMessage: string;
    successMessageEmitOptions?: {
      type: TypedMessage
      payload: PayloadOf<TypedMessage>
    }
  }
}

const BillingNotesField = ({ roleOrClientId, billingNotes, operation, mutationResultOptions }: Props) => {
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: UpdateBillingNotesDocument,
    initialValues: { billingNotes },
    requiredValues: { roleOrClientId },
    mutationResultOptions
  })

  return (
    <EditableField<Pick<UpdateBillingNotesInput, 'billingNotes'>>
      name='billingNotes'
      queryValue={getBillingNotesHook(roleOrClientId)}
      disabled={!isOperationEnabled(operation)}
      value={billingNotes}
      onChange={handleChange}
      multiline
      fullWidthEditor
      editor={props => <EditableTextarea {...props} />}
      viewer={
        <Container right='xsmall'>
          <Typography forwardedAs='div' weight='semibold' css={S.comment}>
            <SimpleHtmlFormatter text={billingNotes || NO_VALUE} />
          </Typography>
        </Container>
      }
    />
  )
}

export default BillingNotesField

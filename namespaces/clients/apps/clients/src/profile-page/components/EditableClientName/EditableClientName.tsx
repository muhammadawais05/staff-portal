import React, { ReactElement, ComponentType } from 'react'
import { Form } from '@toptal/picasso-forms'
import { PatchClientProfileInput, Operation } from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import { Container, TypographyOverflow } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import {
  EditableField,
  getAdjustSingleStringValue
} from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NO_VALUE } from '@staff-portal/config'

import { useGetClientFullName } from './hooks'
import { SetUpdateClientFullNameDocument } from './data'

interface Props {
  clientId: string
  value?: string
  operation?: Operation
  icon?: ReactElement | ComponentType
}

const EditableClientName = ({ clientId, value, operation, icon }: Props) => {
  const { showError } = useNotifications()
  const getClientFullName = useGetClientFullName(clientId)
  const onChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientFullNameDocument,
    initialValues: { fullName: value ?? '' },
    requiredValues: { clientId },
    onCompleted: res => {
      if (!res.patchClientProfile?.success) {
        showError('Failed to update client full name.')
      }
    }
  })

  return (
    <EditableField<Pick<PatchClientProfileInput, 'fullName'>>
      disabled={!isOperationEnabled(operation)}
      alignItems='center'
      name='fullName'
      onChange={onChange}
      queryValue={getClientFullName}
      value={value || undefined}
      updateOnBlur
      showBaseErrorContainer={false}
      adjustValues={getAdjustSingleStringValue('fullName')}
      icon={icon}
      viewer={
        <TypographyOverflow
          color='inherit'
          size='inherit'
          weight='inherit'
          as='span'
        >
          {value || NO_VALUE}
        </TypographyOverflow>
      }
      editor={props => (
        <Container padded='xsmall'>
          <Form.Input {...props} autoFocus width='auto' />
        </Container>
      )}
    />
  )
}

export default EditableClientName

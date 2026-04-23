import React from 'react'
import { Form } from '@toptal/picasso-forms'
import {
  ContactType,
  PatchClientProfileInput
} from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import {
  EditableField,
  getAdjustSingleStringValue
} from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { CompanyOperationFragment } from '@staff-portal/clients'
import { findContact } from '@staff-portal/contacts'

import { getClientSkypeHook } from '../../utils'
import { SkypeViewer } from '../SkypeViewer'
import { CompanyOverviewFragment } from '../../../../data/company-overview-fragment.staff.gql.types'
import { SetPatchClientAccountOverviewDocument } from '../../../../data/set-patch-client-account-overview.staff.gql.types'

interface Props {
  clientId: string
  contact: CompanyOverviewFragment['contact']
  operation: CompanyOperationFragment
}

const AccountOverviewSkype = ({ clientId, contact, operation }: Props) => {
  const skype = contact
    ? findContact(contact.contacts, ContactType.SKYPE)
    : undefined
  const useGetClientSkype = getClientSkypeHook(clientId)
  const value = skype?.value

  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetPatchClientAccountOverviewDocument,
    initialValues: {
      skype: skype?.value ?? ''
    },
    requiredValues: { clientId }
  })

  return (
    <EditableField<Pick<PatchClientProfileInput, 'skype'>>
      disabled={!isOperationEnabled(operation)}
      name='skype'
      onChange={handleChange}
      queryValue={useGetClientSkype}
      value={value}
      updateOnBlur
      adjustValues={getAdjustSingleStringValue('skype')}
      viewer={<SkypeViewer skypeId={value} />}
      editor={props => (
        <Form.Input
          {...props}
          placeholder='Skype username'
          autoFocus
          size='small'
          width='full'
        />
      )}
    />
  )
}

export default AccountOverviewSkype

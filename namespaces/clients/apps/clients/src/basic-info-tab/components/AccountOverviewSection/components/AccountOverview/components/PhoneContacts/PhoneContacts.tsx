import React from 'react'
import {
  UpdateCompanyRepresentativePhoneNumbersInput,
  CompanyRepresentativePhoneInput
} from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import {
  PhoneContactsViewer,
  PhoneContactsEditor
} from '@staff-portal/client-representatives'

import { adjustValues } from './utils'
import { getClientPhoneContactsHook } from '../../utils/get-client-phone-contacts-hook'
import { SetUpdateCompanyRepresentativePhoneNumbersDocument } from '../../../../data/set-update-client-phones.staff.gql.types'
import { CompanyContactsFragment } from '../../../../data'

interface Props {
  clientId: string
  contact: CompanyContactsFragment
  name?: keyof Pick<UpdateCompanyRepresentativePhoneNumbersInput, 'phones'>
}

const PhoneContacts = ({
  contact: { operations, orderedPhoneNumbers, id: companyRepresentativeId },
  clientId,
  name = 'phones'
}: Props) => {
  const useClientPhoneContacts = getClientPhoneContactsHook(clientId)
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateCompanyRepresentativePhoneNumbersDocument,
    initialValues: { companyRepresentativeId },
    requiredValues: { phones: [] }
  })
  const editingDisabled = !isOperationEnabled(
    operations?.updateCompanyRepresentativePhoneNumbers
  )

  return (
    <EditableField<
      UpdateCompanyRepresentativePhoneNumbersInput,
      CompanyRepresentativePhoneInput[]
    >
      value={orderedPhoneNumbers?.nodes}
      editor={({ onReset }) => (
        <PhoneContactsEditor onReset={onReset} formName={name} autoFocus />
      )}
      viewer={
        <PhoneContactsViewer
          nodes={orderedPhoneNumbers?.nodes}
          nodeData={{
            companyRepresentativeId
          }}
        />
      }
      disabled={editingDisabled}
      name={name}
      onChange={handleChange}
      queryValue={useClientPhoneContacts}
      fullWidthEditor={true}
      adjustValues={adjustValues(companyRepresentativeId)}
    />
  )
}

export default PhoneContacts

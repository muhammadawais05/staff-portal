import React from 'react'
import { CompanyRepresentativePhoneInput } from '@staff-portal/graphql/staff'
import { EditableFieldArray } from '@staff-portal/editable'

import { PHONE_CATEGORY_ITEMS } from '../../constants'
import { getFirstAvailablePhoneCategory } from '../../services'
import PhoneContactEditorItem from '../PhoneContactEditorItem/PhoneContactEditorItem'

type Props = {
  onReset?: () => void
  noButtons?: boolean
  formName: string
  autoFocus?: boolean
}

const PhoneContactsEditor = ({
  onReset,
  formName,
  noButtons,
  autoFocus = false
}: Props) => (
  <EditableFieldArray<CompanyRepresentativePhoneInput>
    editor={PhoneContactEditorItem}
    handleReset={onReset}
    formName={formName}
    itemLabel='Phone Number'
    getNewItem={getFirstAvailablePhoneCategory}
    maxItemsCount={PHONE_CATEGORY_ITEMS.length}
    noButtons={noButtons}
    autoFocus={autoFocus}
  />
)

export default PhoneContactsEditor

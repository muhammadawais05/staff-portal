import React from 'react'
import { Form } from '@toptal/picasso-forms'
import {
  PatchClientProfileInput,
  ContactType
} from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import {
  EditableField,
  EditableFieldProps,
  getAdjustSingleStringValue
} from '@staff-portal/editable'
import { ClientPhoneLink } from '@staff-portal/communication'
import { CompanyOperationFragment } from '@staff-portal/clients'

import { getCompanyHqPhoneHook } from '../../utils'
import CompanyHqPhoneViewer from './CompanyHqPhoneViewer'
import CompanyExternalSourceInfo from '../../../../../../../components/CompanyExternalSourceInfo/CompanyExternalSourceInfo'
import { CompanyExternalSourceType } from '../../../../../../../components/CompanyExternalSourceInfo/config'

interface Props {
  value?: string | null
  clientopediaValue?: string | null
  clientId: string
  handleChange: EditableFieldProps<PatchClientProfileInput>['onChange']
  operation: CompanyOperationFragment
}

const CompanyHqPhone = ({
  clientId,
  value: companyHqPhone,
  clientopediaValue,
  handleChange,
  operation
}: Props) => {
  const useGetCompanyHqPhone = getCompanyHqPhoneHook(clientId)
  const value = companyHqPhone?.trim() ?? ''

  return (
    <>
      <EditableField<Pick<PatchClientProfileInput, 'companyHqPhone'>>
        disabled={!isOperationEnabled(operation)}
        name='companyHqPhone'
        onChange={handleChange}
        queryValue={useGetCompanyHqPhone}
        value={value}
        updateOnBlur
        adjustValues={getAdjustSingleStringValue('companyHqPhone')}
        viewer={<CompanyHqPhoneViewer value={value} clientId={clientId} />}
        editor={props => (
          <Form.Input {...props} autoFocus size='small' width='full' />
        )}
      />
      <CompanyExternalSourceInfo
        formattedValue={
          <ClientPhoneLink
            clientId={clientId}
            destination={clientopediaValue ?? ''}
            contactType={ContactType.PHONE}
          />
        }
        value={clientopediaValue}
        userValue={value}
        type={CompanyExternalSourceType.CLIENTOPEDIA}
      />
    </>
  )
}

export default CompanyHqPhone

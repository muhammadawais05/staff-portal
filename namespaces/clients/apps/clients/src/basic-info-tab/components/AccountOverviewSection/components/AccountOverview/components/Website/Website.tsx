import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import {
  EditableField,
  EditableFieldProps,
  getAdjustSingleStringValue
} from '@staff-portal/editable'
import { CompanyOperationFragment } from '@staff-portal/clients'

import WebsiteViewer from './WebsiteViewer'
import { getClientWebsiteHook } from '../../utils/get-client-website-hook'

type Props = {
  website: string
  clientId: string
  handleChange: EditableFieldProps<PatchClientProfileInput>['onChange']
  operation: CompanyOperationFragment
}

const Website = ({ clientId, website, handleChange, operation }: Props) => {
  const useGetClientWebsite = getClientWebsiteHook(clientId)

  return (
    <EditableField<Pick<PatchClientProfileInput, 'website'>>
      disabled={!isOperationEnabled(operation)}
      name='website'
      onChange={handleChange}
      queryValue={useGetClientWebsite}
      value={website}
      updateOnBlur
      adjustValues={getAdjustSingleStringValue('website')}
      viewer={<WebsiteViewer website={website} />}
      editor={props => (
        <Form.Input
          {...props}
          placeholder='Website'
          autoFocus
          size='small'
          width='full'
        />
      )}
    />
  )
}

export default Website

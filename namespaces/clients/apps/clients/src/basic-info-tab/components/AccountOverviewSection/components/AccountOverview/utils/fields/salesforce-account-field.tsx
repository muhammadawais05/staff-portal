import React from 'react'

import SalesforceLink from '../../components/SalesforceLink/SalesforceLink'
import { FieldHelper } from './field-helper'

export const salesforceAccountField: FieldHelper = ({
  company: {
    id: clientId,
    salesforceLink,
    operations: { pushClientToSalesforce }
  }
}) => [
  'Salesforce Account',
  <SalesforceLink
    clientId={clientId}
    operation={pushClientToSalesforce}
    salesforceLink={salesforceLink}
  />
]

import React from 'react'
import { ClientEnterpriseAccountStatusEnum } from '@staff-portal/graphql/staff'

import { FieldHelper } from './field-helper'
import { CompanyOverviewFragment } from '../../../../data/company-overview-fragment.staff.gql.types'
import EnterpriseAccountStatus from '../../components/EnterpriseAccountStatus/EnterpriseAccountStatus'

export const enterpriseAccountStatusField = ({
  parent,
  enterpriseAccountStatus: accountStatus
}: CompanyOverviewFragment): FieldHelper =>
  !parent &&
  !!accountStatus?.status &&
  accountStatus?.status !== ClientEnterpriseAccountStatusEnum.DISABLED &&
  (({
    company: {
      id: clientId,
      enterpriseAccountStatus,
      operations: {
        restoreClientEnterpriseAccountStatus,
        updateClientEnterpriseAccountStatus
      }
    }
  }) => [
    'Enterprise account status',
    <EnterpriseAccountStatus
      clientId={clientId}
      enterpriseAccountStatus={enterpriseAccountStatus}
      restoreClientEnterpriseAccountStatus={
        restoreClientEnterpriseAccountStatus
      }
      updateClientEnterpriseAccountStatus={updateClientEnterpriseAccountStatus}
    />
  ])

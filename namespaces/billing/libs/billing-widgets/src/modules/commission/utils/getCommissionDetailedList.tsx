import React, { SyntheticEvent } from 'react'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import i18n from '@staff-portal/billing/src/utils/i18n'

import {
  GetCommissionQuery,
  ClientCommissionFragment
} from '../data/getCommission.graphql.types'
import { getCommissionDetailedListReferralLabel } from '.'
import CommissionContentItemWithAction from '../components/CommissionContentItemWithAction'

interface GetCommissionsDetailedList {
  commissionData?: Exclude<GetCommissionQuery['node'], null | undefined>
  handleOnClick: (e: SyntheticEvent<HTMLElement, Event>) => void
  isActionsHidden: boolean
}

const getCommissionsDetailedList = ({
  commissionData,
  handleOnClick,
  isActionsHidden
}: GetCommissionsDetailedList) => {
  if (!commissionData) {
    return []
  }
  const { referrer, commissions } = commissionData

  const referrerItem = {
    label: getCommissionDetailedListReferralLabel(
      commissions?.referralCommission
    ),
    value: (
      <CommissionContentItemWithAction
        operation={
          !isActionsHidden
            ? (commissionData as ClientCommissionFragment)?.operations
                ?.changeRoleReferrer
            : undefined
        }
        type='referrer'
        webResource={referrer?.webResource}
        handleOnClick={handleOnClick}
      />
    )
  }

  let detailsList = [referrerItem]

  if ((commissionData as ClientCommissionFragment)?.commissionReceiver) {
    detailsList = [
      ...detailsList,
      {
        label: i18n.t('commission:widget:commissionReceiver.label'),
        value: (
          <WebResourceLinkWrapper
            data-testid='CommissionContentReferral-commissionReceiver-link'
            webResource={
              (commissionData as ClientCommissionFragment)?.commissionReceiver
                ?.webResource
            }
            weight='semibold'
            size='medium'
          />
        )
      }
    ]
  }

  if (
    (commissionData as ClientCommissionFragment)?.claimer &&
    !(commissionData as ClientCommissionFragment)?.commissionReceiver
  ) {
    detailsList = [
      ...detailsList,
      {
        label: i18n.t('commission:widget:claimer.label'),
        value: (
          <CommissionContentItemWithAction
            operation={
              !isActionsHidden
                ? (commissionData as ClientCommissionFragment)?.operations
                    .updateClientClaimer
                : undefined
            }
            type='claimer'
            webResource={
              (commissionData as ClientCommissionFragment)?.claimer?.webResource
            }
            handleOnClick={handleOnClick}
          />
        )
      }
    ]
  }

  return detailsList
}

export default getCommissionsDetailedList

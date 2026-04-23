import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { Section } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'

import { GetCommissionQuery } from '../../data/getCommission.graphql.types'
import { getCommissionDetailedList, useCommission } from '../../utils'

const displayName = 'CommissionContent'

interface Props {
  commissionData?: Exclude<GetCommissionQuery['node'], null | undefined>
  isActionsHidden: boolean
}

const CommissionContent: FC<Props> = memo(
  ({ commissionData, isActionsHidden }) => {
    const { t: translate } = useTranslation('commission')
    const { handleOnActionClick } = useCommission(commissionData?.id)

    if (!commissionData?.commissions) {
      return null
    }

    return (
      <Section
        variant='withHeaderBar'
        title={translate('widget.title', {
          pot: commissionData.commissions.commissionsPot
        })}
      >
        {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
        <DetailedList
          columns={1}
          striped
          labelColumnWidth={10}
          items={getCommissionDetailedList({
            commissionData,
            handleOnClick: handleOnActionClick,
            isActionsHidden
          })}
        />
      </Section>
    )
  }
)

CommissionContent.displayName = displayName

export default CommissionContent

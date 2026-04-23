import { Tabs } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { ChangeEvent, FC, memo } from 'react'
import { OverviewAccessLevel } from '@staff-portal/billing/src/@types/types'
import { useOverviewContext } from '@staff-portal/billing/src/_lib/context/overviewContext'

const displayName = 'EntOverviewBillingHeaderFilter'

export const EntOverviewBillingHeaderFilter: FC = memo(() => {
  const { t: translate } = useTranslation('entOverview')

  const { accessLevel, setAccessLevel, isTeamLead } = useOverviewContext()

  const onFilterChange = (event: ChangeEvent<{}>, newValue: unknown) => {
    setAccessLevel(newValue as OverviewAccessLevel)
  }

  return (
    <Tabs
      value={accessLevel}
      onChange={onFilterChange}
      data-testid={displayName}
    >
      <Tabs.Tab
        value={OverviewAccessLevel.MyBilling}
        label={translate('billing.filter.my-billing')}
        data-testid='tab-my-team'
      />
      {isTeamLead && (
        <Tabs.Tab
          value={OverviewAccessLevel.TeamBilling}
          label={translate('billing.filter.team-billing')}
          data-testid='tab-team-billing'
        />
      )}
    </Tabs>
  )
})

EntOverviewBillingHeaderFilter.defaultProps = {}

EntOverviewBillingHeaderFilter.displayName = displayName

export default EntOverviewBillingHeaderFilter

import React, { useMemo } from 'react'
import { OverviewBlock, Section, SkeletonLoader } from '@toptal/picasso'

import { BetaStaffMemberFragment } from '../../pages/BetaStaffMembers/data/get-beta-staff-member-list'

type Props = {
  loading?: boolean
  data?: BetaStaffMemberFragment[]
}

const getPercentage = (betaAmount: number, total: number) =>
  ((betaAmount / total) * 100 || 0).toFixed(2)

export const getCounters = (data: BetaStaffMemberFragment[] = []) => {
  const total = data.length
  const betaEnabled = data.filter(node => node.staffPortalBetaEnabled).length
  const betaEnabledPercentage = getPercentage(betaEnabled, total)
  const betaDisabled = total - betaEnabled
  const betaDisabledPercentage = getPercentage(betaDisabled, total)

  return {
    total,
    betaEnabled: `${betaEnabled} (${betaEnabledPercentage}%)`,
    betaDisabled: `${betaDisabled} (${betaDisabledPercentage}%)`
  }
}

const BetaStaffOverview = ({ loading, data }: Props) => {
  const counters = useMemo(() => getCounters(data), [data])
  const showLoader = loading || !data

  return (
    <Section>
      <OverviewBlock.Group>
        <OverviewBlock
          value={showLoader ? <SkeletonLoader.Header /> : counters?.total}
          label='Total'
        />
        <OverviewBlock
          value={showLoader ? <SkeletonLoader.Header /> : counters?.betaEnabled}
          label='Beta enabled'
          variant='label-green'
        />
        <OverviewBlock
          value={
            showLoader ? <SkeletonLoader.Header /> : counters?.betaDisabled
          }
          label='Beta disabled'
          variant='label-red'
        />
      </OverviewBlock.Group>
    </Section>
  )
}

export default BetaStaffOverview

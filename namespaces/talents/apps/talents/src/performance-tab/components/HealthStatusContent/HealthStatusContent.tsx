import React, { useState } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { TalentHealthStatusValue } from '@staff-portal/graphql/staff'
import { OperationFragment } from '@staff-portal/operations'
import { HealthStatusField } from '@staff-portal/talents'

import { TalentPerformanceHealthStatusFragment } from '../../data/get-talent-health-status-with-history'
import HealthStatusActions from '../HealthStatusActions'
import HealthStatusHistory from '../HealthStatusHistory'

interface Props {
  currentHealthStatus?: TalentHealthStatusValue
  healthStatusHistory: TalentPerformanceHealthStatusFragment[]
  talentId: string
  setHealthStatusTalent?: OperationFragment
}

const HealthStatusContent = ({
  currentHealthStatus,
  healthStatusHistory,
  talentId,
  setHealthStatusTalent
}: Props) => {
  const [showHistory, setShowHistory] = useState(false)

  const toggleHistory = () => setShowHistory(!showHistory)

  return (
    <>
      <Container
        flex
        justifyContent='space-between'
        data-testid='HealthStatusContent'
      >
        <Container flex justifyContent='space-between'>
          <Typography size='medium' css={{ width: '9rem' }}>
            Health Status
          </Typography>

          <HealthStatusField status={currentHealthStatus} weight='semibold' />
        </Container>

        <HealthStatusActions
          talentId={talentId}
          setHealthStatusTalent={setHealthStatusTalent}
          historyLabel={`${showHistory ? 'Hide' : 'Show'} History`}
          historyIsEmpty={healthStatusHistory.length === 0}
          historyOnClick={toggleHistory}
        />
      </Container>

      {showHistory && (
        <Container top='small'>
          <HealthStatusHistory healthStatusHistory={healthStatusHistory} />
        </Container>
      )}
    </>
  )
}

export default HealthStatusContent

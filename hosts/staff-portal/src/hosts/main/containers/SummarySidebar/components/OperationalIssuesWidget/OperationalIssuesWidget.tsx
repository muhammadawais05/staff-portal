import React, { useState } from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { OperationalIssueCounters } from '@staff-portal/graphql/staff'
import {
  getOperationalIssuesPath,
  OperationalIssuesPathEscalated,
  OperationalIssuesPathOwnedBy,
  OperationalIssuesPathStatus
} from '@staff-portal/routes'
import { LinkWrapper } from '@staff-portal/ui'
import { isNotNullish } from '@staff-portal/utils'
import { useRefetchOnPathChange } from '@staff-portal/navigation'

import CounterRow from '../CounterRow'
import SidebarWidget from '../SidebarWidget'
import WidgetSectionLoader from '../WidgetSectionLoader'
import StripeRow from '../StripeRow'
import { useGetOperationalIssuesCounters } from './data/get-operational-issues-counters'
import StaffTreeModal from '../StaffTreeModal'

interface OperationalIssuesCountersProps {
  counters?: OperationalIssueCounters
}

const OperationalIssuesCounters = ({
  counters
}: OperationalIssuesCountersProps) => {
  if (!counters) {
    return null
  }

  const { all, escalated, mine, team } = counters

  return (
    <>
      {isNotNullish(mine) && (
        <StripeRow>
          <LinkWrapper
            data-testid='your-issues'
            wrapWhen={!!mine}
            href={getOperationalIssuesPath({
              ownedBy: OperationalIssuesPathOwnedBy.ME,
              status: [
                OperationalIssuesPathStatus.PENDING,
                OperationalIssuesPathStatus.CLAIMED,
                OperationalIssuesPathStatus.REOPENED
              ]
            })}
          >
            <CounterRow name='Your Issues' count={mine} />
          </LinkWrapper>
        </StripeRow>
      )}

      {isNotNullish(team) && (
        <StripeRow>
          <LinkWrapper
            data-testid='team-issues'
            wrapWhen={!!team}
            href={getOperationalIssuesPath({
              ownedBy: OperationalIssuesPathOwnedBy.TEAM,
              status: [
                OperationalIssuesPathStatus.PENDING,
                OperationalIssuesPathStatus.CLAIMED,
                OperationalIssuesPathStatus.REOPENED
              ]
            })}
          >
            <CounterRow name='Team Issues' count={team} />
          </LinkWrapper>
        </StripeRow>
      )}

      {isNotNullish(all) && (
        <StripeRow>
          <LinkWrapper
            data-testid='all-issues'
            wrapWhen={!!all}
            href={getOperationalIssuesPath({
              ownedBy: OperationalIssuesPathOwnedBy.ALL,
              status: [
                OperationalIssuesPathStatus.PENDING,
                OperationalIssuesPathStatus.CLAIMED,
                OperationalIssuesPathStatus.REOPENED
              ]
            })}
          >
            <CounterRow name='All Issues' count={all} />
          </LinkWrapper>
        </StripeRow>
      )}

      {isNotNullish(escalated) && (
        <StripeRow>
          <LinkWrapper
            data-testid='escalated-issues'
            wrapWhen={!!escalated}
            href={getOperationalIssuesPath({
              escalated: OperationalIssuesPathEscalated.ESCALATED,
              ownedBy: OperationalIssuesPathOwnedBy.ALL,
              status: [
                OperationalIssuesPathStatus.PENDING,
                OperationalIssuesPathStatus.CLAIMED,
                OperationalIssuesPathStatus.REOPENED
              ]
            })}
          >
            <CounterRow name='Escalated Issues' count={escalated} />
          </LinkWrapper>
        </StripeRow>
      )}
    </>
  )
}

const OperationalIssuesWidget = () => {
  const [modalIsOpening, setModalIsOpening] = useState(false)
  const { showModal } = useModal(StaffTreeModal, {
    onModalLoaded: () => setModalIsOpening(false)
  })
  const { data, loading, refetch } = useGetOperationalIssuesCounters()

  useRefetchOnPathChange([refetch])

  if (!data && loading) {
    return <WidgetSectionLoader rows={4} hasButton />
  }

  return (
    <>
      <SidebarWidget title='Your Operational Issues'>
        <OperationalIssuesCounters counters={data} />
        <SidebarWidget.BottomContainer>
          <Button
            variant='secondary'
            size='small'
            loading={modalIsOpening}
            onClick={() => {
              showModal()
              setModalIsOpening(true)
            }}
          >
            Show Tree View
          </Button>
        </SidebarWidget.BottomContainer>
      </SidebarWidget>
    </>
  )
}

export default OperationalIssuesWidget

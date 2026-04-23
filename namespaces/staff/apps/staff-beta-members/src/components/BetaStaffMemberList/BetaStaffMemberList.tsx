import React, { useMemo } from 'react'
import { Section, Container, SkeletonLoader, Table } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useNotifications } from '@staff-portal/error-handling'
import { NoSearchResultsMessage, TableSkeleton } from '@staff-portal/ui'
import { useSelectableItems } from '@staff-portal/utils'

import { BetaStaffMemberFragment } from '../../pages/BetaStaffMembers/data/get-beta-staff-member-list'
import BetaStaffDisableButton from '../BetaStaffActionsHeader/BetaStaffDisableButton/BetaStaffDisableButton'
import BetaStaffEnableButton from '../BetaStaffActionsHeader/BetaStaffEnableButton/BetaStaffEnableButton'
import AddBetaEarlyAdoptersButton from '../BetaStaffActionsHeader/AddBetaEarlyAdoptersButton/AddBetaEarlyAdoptersButton'
import RemoveBetaEarlyAdoptersButton from '../BetaStaffActionsHeader/RemoveBetaEarlyAdoptersButton/RemoveBetaEarlyAdoptersButton'
import BetaStaffActionsHeader from '../BetaStaffActionsHeader/BetaStaffActionsHeader'
import { useGetBulkBetaStaffOperations } from '../BetaStaffActionsHeader/data/get-bulk-beta-staff-operations/get-bulk-beta-staff-operations.staff.gql'
import { STAFF_BETA_STATUS_UPDATED } from '../../core/messages'
import { useGetStaffBetaStatus } from '../BetaStaffActionsHeader/data/get-staff-beta-status/get-staff-beta-status.staff.gql'
import {
  BetaStaffMemberListHeader,
  BetaStaffMemberListRows
} from './components'

const NO_RESULTS_MESSAGE = 'No beta staff members'

const cols = [
  {
    title: 'Full Name'
  },
  {
    title: 'Last Visited Date'
  },
  {
    title: 'Teams'
  },
  {
    title: 'SP Beta Enabled'
  },
  {
    title: 'Early Adopters'
  }
]

type Props = {
  loading?: boolean
  data?: BetaStaffMemberFragment[]
}

const BetaStaffMemberList = ({ loading, data }: Props) => {
  const { data: operations } = useGetBulkBetaStaffOperations()

  const betaStaffIds = useMemo(() => data?.map(({ id }) => id) || [], [data])

  const {
    selectedIds,
    selectItem,
    deselectItem,
    selectAllItems,
    deselectAllItems
  } = useSelectableItems(betaStaffIds)

  const isAllSelected = selectedIds.length === betaStaffIds.length

  const { showError } = useNotifications()

  const [refetchUpdatedSelectedStaff] = useGetStaffBetaStatus({
    onError: () =>
      showError(`Unable to enable beta pages for the selected staff members.`),
    staffIds: selectedIds
  })

  useMessageListener(STAFF_BETA_STATUS_UPDATED, () =>
    refetchUpdatedSelectedStaff()
  )

  if (loading || !data) {
    return (
      <Section>
        <BetaStaffActionsHeader>
          {[...Array(4)].map(() => (
            <Container left='small'>
              <SkeletonLoader.Button size='small' />
            </Container>
          ))}
        </BetaStaffActionsHeader>
        <TableSkeleton
          rows={20}
          cols={cols}
          dataTestId='beta-staff-members-loader'
          variant='clear'
        />
      </Section>
    )
  }

  return (
    <Section>
      {data?.length ? (
        <>
          <BetaStaffActionsHeader>
            <BetaStaffEnableButton
              staffIds={selectedIds}
              operation={operations.bulkEnableBeta}
            />
            <BetaStaffDisableButton
              staffIds={selectedIds}
              operation={operations.bulkDisableBeta}
            />
            <AddBetaEarlyAdoptersButton
              staffIds={selectedIds}
              operation={operations.addBetaEarlyAdopters}
            />
            <RemoveBetaEarlyAdoptersButton
              staffIds={selectedIds}
              operation={operations.removeBetaEarlyAdopters}
            />
          </BetaStaffActionsHeader>
          <Table variant='striped' spacing='compact'>
            <Table.Head>
              <BetaStaffMemberListHeader
                cols={cols}
                isAllSelected={isAllSelected}
                onAllItemsSelect={selectAllItems}
                onAllItemsDeselect={deselectAllItems}
              />
            </Table.Head>
            <Table.Body>
              <BetaStaffMemberListRows
                rows={data}
                selectedIds={selectedIds}
                onSelectItem={selectItem}
                onDeselectItem={deselectItem}
              />
            </Table.Body>
          </Table>
        </>
      ) : (
        <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
      )}
    </Section>
  )
}

export default BetaStaffMemberList

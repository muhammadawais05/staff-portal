import React, { useState } from 'react'
import { Container, Tag, Tabs, UserBadge } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { RoleOwnedOperationalIssueScope } from '@staff-portal/graphql/staff'

import { GetLatestOperationalIssuesForUserQuery } from './data/get-latest-owned-operational-issues'
import { OperationalIssuesStaffTreeCardNodeFragment } from '../StaffTreeModal/data/get-operational-issues-staff-tree'
import { useGetLatestOwnedOperationalIssues } from './data'
import OperationalIssuesList from '../OperationalIssuesList'
import { INITIAL_OPERATIONAL_ISSUES_COUNT } from '../../config'
import * as S from './styles'

const getModalTitle = ({
  role: { fullName, photo },
  issuesCount
}: OperationalIssuesStaffTreeCardNodeFragment) => (
  <UserBadge
    name={fullName}
    renderName={() =>
      issuesCount
        ? `${fullName} has ${issuesCount} unresolved issue${
            issuesCount > 1 ? 's' : ''
          }`
        : `${fullName} does not have any unresolved issues`
    }
    avatar={photo?.thumb}
  />
)

const getTabLabel = (
  text: string,
  counter: number,
  variant: 'red' | 'green' = 'red'
) => (
  <Container flex alignItems='center'>
    {counter !== 0 && (
      <Tag variant={variant} css={S.tag}>
        {counter}
      </Tag>
    )}
    {text}
  </Container>
)

enum Tab {
  PENDING = 0,
  CLAIMED = 1,
  RESOLVED = 2
}

const getCurrentTab = ({
  openedTab,
  ownerId,
  data
}: {
  openedTab: Tab
  ownerId: string
  data: NonNullable<GetLatestOperationalIssuesForUserQuery['staffNode']>
}) => {
  const {
    pendingOperationalIssues,
    claimedOperationalIssues,
    resolvedOperationalIssues
  } = data

  if (openedTab === Tab.PENDING) {
    return (
      <OperationalIssuesList
        key={RoleOwnedOperationalIssueScope.PENDING}
        ownerId={ownerId}
        scope={RoleOwnedOperationalIssueScope.PENDING}
        operationalIssues={pendingOperationalIssues}
      />
    )
  }

  if (openedTab === Tab.CLAIMED) {
    return (
      <OperationalIssuesList
        key={RoleOwnedOperationalIssueScope.CLAIMED}
        ownerId={ownerId}
        scope={RoleOwnedOperationalIssueScope.CLAIMED}
        operationalIssues={claimedOperationalIssues}
      />
    )
  }

  return (
    <OperationalIssuesList
      key={RoleOwnedOperationalIssueScope.RESOLVED}
      ownerId={ownerId}
      scope={RoleOwnedOperationalIssueScope.RESOLVED}
      operationalIssues={resolvedOperationalIssues}
    />
  )
}

export interface Props {
  staffMember: OperationalIssuesStaffTreeCardNodeFragment
  onOpen: () => void
  onClose: () => void
  hideModal: () => void
}

const OperationalIssuesModal = ({
  staffMember,
  onOpen,
  onClose,
  hideModal
}: Props) => {
  const [openedTab, setOpenedTab] = useState(Tab.PENDING)
  const { data, loading } = useGetLatestOwnedOperationalIssues({
    ownedBy: staffMember.role.id,
    limit: INITIAL_OPERATIONAL_ISSUES_COUNT
  })

  if (loading) {
    return null
  }

  if (!data) {
    throw new Error('Error occurred while fetching user operational issues')
  }

  const onModalClose = () => {
    onClose()
    hideModal()
  }

  return (
    <Modal onOpen={onOpen} onClose={onModalClose} open size='large'>
      <Modal.Title>{getModalTitle(staffMember)}</Modal.Title>
      <Modal.Content>
        <Tabs
          value={openedTab}
          onChange={(_, newValue) => setOpenedTab(newValue)}
        >
          <Tabs.Tab
            label={getTabLabel(
              'Pending Operational Issues',
              data.pendingOperationalIssues?.totalCount ?? 0
            )}
          />
          <Tabs.Tab
            label={getTabLabel(
              'Claimed Operational Issues',
              data.claimedOperationalIssues?.totalCount ?? 0
            )}
          />
          <Tabs.Tab
            label={getTabLabel(
              'Resolved Operational Issues',
              data.resolvedOperationalIssues?.totalCount ?? 0,
              'green'
            )}
          />
        </Tabs>

        <Container top='small'>
          {getCurrentTab({
            openedTab,
            ownerId: staffMember.role.id,
            data
          })}
        </Container>
      </Modal.Content>
    </Modal>
  )
}

export default OperationalIssuesModal

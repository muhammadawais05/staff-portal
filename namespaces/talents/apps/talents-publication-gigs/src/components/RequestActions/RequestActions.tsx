import React from 'react'
import {
  Button,
  Container,
  Dropdown,
  Menu,
  More16,
  Typography
} from '@toptal/picasso'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@toptal/picasso/utils'
import { PublicationGigStatus } from '@staff-portal/graphql/staff'
import { GigFragment } from '@staff-portal/talents-gigs'

import {
  ClaimRequest,
  ApproveRequest,
  CloseRequest,
  CompleteRequest,
  RequestModal,
  SearchCandidates
} from '../../components'
import * as S from './styles'

type ViewType = 'list' | 'page'

type Props = {
  request: GigFragment
  currentUserId?: string
  viewType?: ViewType
}

const RequestActions = ({ request, currentUserId }: Props) => {
  const { hideModal, showModal, isOpen } = useModal()

  const canClaim = request.status === PublicationGigStatus.PENDING
  const isClaimer = request.claimedBy?.role.id === currentUserId
  const isCreator = request.createdBy?.role.id === currentUserId
  const isOwner = isClaimer || isCreator
  const canApprove =
    request.status === PublicationGigStatus.CLAIMED && isClaimer
  const canEdit =
    isOwner &&
    [
      PublicationGigStatus.CLAIMED,
      PublicationGigStatus.APPROVED,
      PublicationGigStatus.MATCHED
    ].includes(request.status)
  const canClose =
    isOwner &&
    [
      PublicationGigStatus.PENDING,
      PublicationGigStatus.CLAIMED,
      PublicationGigStatus.APPROVED,
      PublicationGigStatus.MATCHED
    ].includes(request.status)

  const canComplete =
    request.status === PublicationGigStatus.MATCHED && isClaimer
  const showMoreOptions = canEdit || canClose

  const handleEditRequestClick = () => {
    showModal()
  }

  return (
    <Container flex justifyContent='flex-end' css={S.container}>
      {canClaim && <ClaimRequest gigId={request.id} />}
      {canApprove && <ApproveRequest gigId={request.id} />}
      {canComplete && (
        <CompleteRequest gigId={request.id}>
          <Button titleCase={false} size='small'>
            Mark as Fulfilled
          </Button>
        </CompleteRequest>
      )}
      <SearchCandidates request={request} />
      {showMoreOptions && (
        <Dropdown
          css={S.dropdown}
          content={
            <Menu>
              {canEdit && (
                <Menu.Item
                  onClick={handleEditRequestClick}
                  data-testid='openEditRequestButton'
                >
                  <Container right='medium' flex alignItems='center'>
                    <Typography size='medium'>Edit Request</Typography>
                  </Container>
                </Menu.Item>
              )}
              {canClose && <CloseRequest gigId={request.id} />}
            </Menu>
          }
        >
          <Container data-testid='showMoreOptions'>
            <More16 />
          </Container>
        </Dropdown>
      )}
      <RequestModal hideModal={hideModal} open={isOpen} request={request} />
    </Container>
  )
}

export default RequestActions

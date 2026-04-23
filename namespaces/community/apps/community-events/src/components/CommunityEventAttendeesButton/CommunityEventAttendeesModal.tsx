import React, { useState } from 'react'
import { Pagination, Container, Table, SkeletonLoader } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'

import { useGetCommunityEventAttendees } from '../../data/get-community-event-attendees/get-community-event-attendees.staff.gql'

interface Props {
  communityEventId: string
  totalAttendees: number
  hideModal: () => void
}

const ITEMS_PER_PAGE = 10

const CommunityEventAttendeesModal = ({
  communityEventId,
  totalAttendees,
  hideModal
}: Props) => {
  const [page, setPage] = useState(0)

  const { data, loading } = useGetCommunityEventAttendees({
    variables: {
      id: communityEventId,
      pagination: {
        offset: page * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE
      }
    }
  })

  return (
    <Modal open onClose={hideModal}>
      <Modal.Title>Attendees</Modal.Title>
      <Modal.Content>
        {loading && !data ? (
          <Container
            flex
            direction='column'
            gap={0.75}
            data-testid='loadingAttendees'
          >
            <SkeletonLoader.Typography rows={5} />
          </Container>
        ) : (
          <Table variant='striped' data-testid='attendeesTable'>
            <Table.Head>
              <Table.Row>
                <Table.Cell>Name</Table.Cell>
                <Table.Cell>Email</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {data?.map(attendee => (
                <Table.Row key={attendee.id}>
                  <Table.Cell>{attendee.fullName}</Table.Cell>
                  <Table.Cell>{attendee.email}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
        {Boolean(data?.length) && (
          <Container top='medium'>
            <Pagination
              disabled={loading}
              activePage={page + 1}
              totalPages={Math.ceil(totalAttendees / ITEMS_PER_PAGE)}
              onPageChange={to => setPage(to - 1)}
            />
          </Container>
        )}
      </Modal.Content>
    </Modal>
  )
}

export default CommunityEventAttendeesModal

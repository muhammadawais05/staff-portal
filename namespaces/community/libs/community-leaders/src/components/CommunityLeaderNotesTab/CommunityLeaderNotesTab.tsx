import React, { memo, useRef } from 'react'
import { Container, SkeletonLoader, Section } from '@toptal/picasso'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { isAfter, isBefore, parseISO } from '@staff-portal/date-time-utils'
import { Notes } from '@staff-portal/notes'

import AddNoteButton from '../AddNoteButton'
import { useGetCommunityLeaderNotes } from '../../data/get-community-leader-notes/get-community-leader-notes.staff.gql'
import { CommunityLeaderData } from '../../types'

type Props = {
  communityLeaderId: string
  communityLeader: CommunityLeaderData
  actionOnSection?: boolean
  sectionTitle?: string
}

// eslint-disable-next-line complexity
const CommunityLeaderNotesTab = ({
  communityLeaderId,
  communityLeader,
  sectionTitle,
  actionOnSection = false
}: Props) => {
  const { data, loading, refetch } =
    useGetCommunityLeaderNotes(communityLeaderId)
  const formContainerRef = useRef<HTMLDivElement>(null)

  const sortedNotes = [...(data?.leaderNotes?.nodes || [])].sort(
    (first, second) => {
      const firstCreatedAt = parseISO(first.createdAt)
      const secondCreatedAt = parseISO(second.createdAt)

      if (isAfter(firstCreatedAt, secondCreatedAt)) {
        return -1
      }
      if (isBefore(firstCreatedAt, secondCreatedAt)) {
        return 1
      }

      return 0
    }
  )

  return (
    <Section
      variant={actionOnSection ? 'withHeaderBar' : 'default'}
      title={sectionTitle}
      actions={
        actionOnSection ? (
          <Container>
            {loading && !data && <SkeletonLoader.Button size='small' />}
            {!loading && data && (
              <AddNoteButton
                communityLeaderId={data.id}
                communityLeader={communityLeader}
                onComplete={refetch}
                createNoteOperation={{
                  // TODO: Replace operation with proper operation that comes from GraphQL Query :)
                  callable: OperationCallableTypes.ENABLED,
                  messages: []
                }}
                formContainer={formContainerRef}
              />
            )}
          </Container>
        ) : null
      }
    >
      <Container top='small' flex direction='column'>
        <Container
          flex
          direction='row'
          justifyContent='flex-end'
          bottom='medium'
        >
          {!actionOnSection && loading && !data && (
            <SkeletonLoader.Button size='small' />
          )}
          {!actionOnSection && !loading && data && (
            <AddNoteButton
              communityLeaderId={data.id}
              communityLeader={communityLeader}
              onComplete={refetch}
              createNoteOperation={{
                // TODO: Replace operation with proper operation that comes from GraphQL Query :)
                callable: OperationCallableTypes.ENABLED,
                messages: []
              }}
              formContainer={formContainerRef}
            />
          )}
        </Container>
        <div ref={formContainerRef} />
        {loading &&
          !data &&
          Array.from({ length: 4 }).map((_, idx) => (
            <Container
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              bordered
              rounded
              padded='medium'
              bottom='small'
            >
              <SkeletonLoader.Typography rows={3} />
            </Container>
          ))}
        {!loading && sortedNotes.length > 0 && (
          <Notes
            notes={sortedNotes}
            onUpdate={refetch}
            refetchNotes={refetch}
          />
        )}
      </Container>
    </Section>
  )
}

export default memo(CommunityLeaderNotesTab)

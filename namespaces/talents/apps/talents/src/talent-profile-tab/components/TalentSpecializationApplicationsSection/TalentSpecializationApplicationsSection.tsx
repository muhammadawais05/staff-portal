import React, { memo } from 'react'
import { Table, SkeletonLoader, Container } from '@toptal/picasso'
import Section, { SectionProps } from '@toptal/picasso/Section'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useNotifications } from '@staff-portal/error-handling'
import { ItemsTable } from '@staff-portal/ui'
import { isOperationHidden } from '@staff-portal/operations'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { useUserTimeZone } from '@staff-portal/current-user'

import TalentSpecializationApplicationItem from './components/TalentSpecializationApplicationItem'
import {
  useGetTalentSpecializationApplications,
  GetTalentSpecializationApplicationsQuery
} from './data/get-talent-specialization-applications'
import { TalentSpecializationApplicationFragment } from './data/talent-specialization-application-fragment'
import SendTalentToSpecializationButton from './components/SendTalentToSpecializationButton'
import AddTalentToRemoteConsultingButton from './components/AddTalentToRemoteConsultingButton'
import * as S from './styles'

const sortByStartedAt = (items: TalentSpecializationApplicationFragment[]) =>
  items.sort((itemA, itemB) => {
    if (!itemA.startedAt || !itemB.startedAt) {
      return 0
    }

    // eslint-disable-next-line @miovision/disallow-date/no-new-date
    return new Date(itemA.startedAt) > new Date(itemB.startedAt) ? -1 : 1
  })

const getSectionActions = ({
  talentId,
  talentName,
  data
}: {
  talentId: string
  talentName: string
  data?: GetTalentSpecializationApplicationsQuery['node']
}) => {
  const sendTalentToSpecializationOperation =
    data?.operations.sendTalentToSpecialization

  const addTalentToRemoteConsultingOperation =
    data?.operations.addTalentToRemoteConsulting

  return (
    <Container css={S.buttonsContainer}>
      {sendTalentToSpecializationOperation && (
        <SendTalentToSpecializationButton
          talentId={talentId}
          talentName={talentName}
          operation={sendTalentToSpecializationOperation}
        />
      )}

      {addTalentToRemoteConsultingOperation && (
        <AddTalentToRemoteConsultingButton
          talentId={talentId}
          operation={addTalentToRemoteConsultingOperation}
        />
      )}
    </Container>
  )
}

const checkActions = (items: TalentSpecializationApplicationFragment[] = []) =>
  items
    .map(item => item.operations)
    .some(operations =>
      Object.values(operations).some(
        operation =>
          typeof operation !== 'string' && !isOperationHidden(operation)
      )
    )
const getTalentInfo = (
  node?: GetTalentSpecializationApplicationsQuery['node']
) => ({
  name: node?.fullName || ''
})

export interface Props {
  talentId: string
  sectionVariant?: SectionProps['variant']
}

const TalentSpecializationApplicationsSection = ({
  talentId,
  sectionVariant = 'default'
}: Props) => {
  const { showDevError } = useNotifications()

  const userTimezone = useUserTimeZone()

  const { data, loading, refetch } = useGetTalentSpecializationApplications({
    talentId,
    onError: () => showDevError('Unable to get specialization applications.')
  })

  useMessageListener(
    [TALENT_UPDATED],
    ({ talentId: id }) => id === talentId && refetch()
  )

  if (loading && !data) {
    return <SkeletonLoader.Typography />
  }

  const items = data?.specializationApplications?.nodes

  const hasActions = checkActions(items)
  const { name: talentName } = getTalentInfo(data)

  return items?.length ? (
    <Section
      data-testid='talent-specialization-applications-section'
      title='Specialization Applications'
      actions={getSectionActions({
        talentId,
        data,
        talentName
      })}
      variant={sectionVariant}
    >
      <ItemsTable
        renderHeader={() => (
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>Started by</Table.Cell>
            <Table.Cell>Started on</Table.Cell>
            <Table.Cell>Concluded on</Table.Cell>
            {hasActions && <Table.Cell>Actions</Table.Cell>}
          </Table.Row>
        )}
        renderRow={(item, index) => (
          <TalentSpecializationApplicationItem
            key={item.id}
            item={item}
            talentId={talentId}
            talentName={talentName}
            userTimezone={userTimezone as string}
            hasActions={hasActions}
            stripeEven={Boolean(index % 2)}
          />
        )}
        data={sortByStartedAt([...items])}
      />
    </Section>
  ) : null
}

export default memo(TalentSpecializationApplicationsSection)

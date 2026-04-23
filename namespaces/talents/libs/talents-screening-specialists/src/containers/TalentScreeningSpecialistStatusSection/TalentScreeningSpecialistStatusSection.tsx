import React, { memo } from 'react'
import { Table, Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import Section, { SectionProps } from '@toptal/picasso/Section'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { SpecialistAssignmentStatuses } from '@staff-portal/graphql/staff'
import { ColoredStatus } from '@staff-portal/ui'
import {
  TALENT_UPDATED,
  SPECIALIST_ASSIGNMENT_STATUS_MAPPING
} from '@staff-portal/talents'

import { useGetTalentWithScreeningSpecialist } from './data'
import AssignButton from './components/AssignButton'
import ArchiveButton from './components/ArchiveButton'
import * as S from './styles'
import SectionAssignmentsLoader from './components/SectionAssignmentsLoader'
import AssigneeCell from './components/AssigneeCell'

interface Props {
  talentId: string
  sectionVariant?: SectionProps['variant']
}

const TalentScreeningSpecialistStatusSection = ({
  talentId,
  sectionVariant = 'default'
}: Props) => {
  const { showError } = useNotifications()

  const { talent, loading, refetch } = useGetTalentWithScreeningSpecialist(
    talentId,
    {
      onError: () => {
        showError('Unable to fetch screening specialist.')
      }
    }
  )

  useMessageListener(
    [TALENT_UPDATED],
    ({ talentId: id }) => id === talentId && refetch()
  )

  const title = 'Talent Screening Specialist Status'

  if (loading) {
    return (
      <SectionAssignmentsLoader title={title} sectionVariant={sectionVariant} />
    )
  }

  if (!talent) {
    return null
  }

  const {
    currentSpecialistAssignment,
    operations: {
      assignScreeningSpecialistToTalent:
        assignScreeningSpecialistToTalentOperation
    }
  } = talent

  const {
    id: assignmentId,
    operations: {
      archiveSpecialistAssignment: archiveSpecialistAssignmentOperation
    },
    status,
    assignee
  } = currentSpecialistAssignment || {
    status: SpecialistAssignmentStatuses.NONE,
    operations: {}
  }

  const AssignmentStatus = () => {
    const { text, color } = SPECIALIST_ASSIGNMENT_STATUS_MAPPING[status]

    return <ColoredStatus status={text} color={color} />
  }

  const testId = assignee
    ? 'specialist-assignment-table'
    : 'empty-specialist-assignment-table'

  return (
    <Section
      title={title}
      variant={sectionVariant}
      data-testid='talent-screening-specialist-status-section'
    >
      <Table data-testid={testId} variant='striped'>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Assignee</Table.Cell>
            <Table.Cell css={S.noWrap}>TSS status</Table.Cell>
            <Table.Cell css={S.fullWidth} />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell data-testid='tss-assignee-cell' css={S.noWrap}>
              <AssigneeCell assignee={assignee} />
            </Table.Cell>
            <Table.Cell data-testid='tss-status-cell'>
              <AssignmentStatus />
            </Table.Cell>
            <Table.Cell>
              <Container flex justifyContent='flex-end' left='small'>
                <ArchiveButton
                  assignmentId={assignmentId}
                  operation={archiveSpecialistAssignmentOperation}
                />
                <AssignButton
                  talentId={talentId}
                  assignment={currentSpecialistAssignment}
                  operation={assignScreeningSpecialistToTalentOperation}
                />
              </Container>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Section>
  )
}

export default memo(TalentScreeningSpecialistStatusSection)

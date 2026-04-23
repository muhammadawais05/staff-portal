import React, { useState, memo } from 'react'
import { Container, Button, Tooltip, SkeletonLoader } from '@toptal/picasso'
import Section, { SectionProps } from '@toptal/picasso/Section'
import {
  TypedMessage,
  useMessageListener
} from '@toptal/staff-portal-message-bus'
import { Maybe } from '@staff-portal/graphql/staff'

import {
  useGetOfacStatusData,
  OfacStatusData
} from './data/get-ofac-status-data'
import * as S from './styles'
import ChangeOFACStatusButton from './components/ChangeOFACStatusButton'
import { useGetAssociatedRolesAndStatus } from './services'
import OFACStatusChangesTable from './components/OFACStatusChangesTable'

const SECTION_TITLE = 'OFAC Compliance'

const HistoryButton = ({
  numberOfStatusChanges,
  onClick,
  sectionIsExpanded
}: {
  numberOfStatusChanges: number
  onClick: () => void
  sectionIsExpanded: boolean
}) => {
  const disabled = numberOfStatusChanges === 0
  const button = (
    <Button
      size='small'
      variant='secondary'
      disabled={disabled}
      onClick={onClick}
    >
      {sectionIsExpanded
        ? `Hide History`
        : `Show History (${numberOfStatusChanges})`}
    </Button>
  )

  if (disabled) {
    return (
      <Tooltip content='There is no OFAC compliance history yet'>
        <Container left='xsmall'>{button}</Container>
      </Tooltip>
    )
  }

  return <Container left='xsmall'>{button}</Container>
}

const getStatusChanges = (ofacData?: Maybe<OfacStatusData>) =>
  ofacData?.ofacStatusChanges?.nodes || []

interface Props {
  nodeId: string
  sectionVariant?: SectionProps['variant']
  listenedMessages?: TypedMessage[]
}

/* eslint-disable-next-line complexity */
const OFACComplianceSection = ({
  nodeId,
  sectionVariant = 'default',
  listenedMessages = []
}: Props) => {
  const { ofacData, loading, error, refetch } = useGetOfacStatusData(nodeId)
  const [sectionIsExpanded, setSectionIsExpanded] = useState(false)
  const statusChanges = getStatusChanges(ofacData)
  const { roleOrClientStatus, associatedRoles } =
    useGetAssociatedRolesAndStatus(ofacData)

  useMessageListener(listenedMessages, () => refetch({ id: nodeId }))

  if (loading && !ofacData) {
    return (
      <Section
        title={SECTION_TITLE}
        variant={sectionVariant}
        actions={
          <Container flex>
            <Container>
              <SkeletonLoader.Button size='small' />
            </Container>
            <Container left='medium'>
              <SkeletonLoader.Button size='small' />
            </Container>
          </Container>
        }
      >
        <SkeletonLoader.Typography />
      </Section>
    )
  }

  if (error || !ofacData) {
    return null
  }

  const { fullName, ofacStatus, operations } = ofacData

  return (
    <Section
      title={SECTION_TITLE}
      css={sectionIsExpanded ? '' : S.header}
      actions={
        <>
          <ChangeOFACStatusButton
            nodeId={nodeId}
            fullName={fullName}
            roleOrClientStatus={roleOrClientStatus}
            ofacStatus={ofacStatus}
            operations={operations}
            associatedRoles={associatedRoles}
          />
          <HistoryButton
            numberOfStatusChanges={statusChanges.length}
            sectionIsExpanded={sectionIsExpanded}
            onClick={() => setSectionIsExpanded(!sectionIsExpanded)}
          />
        </>
      }
      variant={sectionVariant}
      data-testid='talent-ofac-compliance-section'
    >
      {sectionIsExpanded && <OFACStatusChangesTable items={statusChanges} />}
    </Section>
  )
}

export default memo(OFACComplianceSection)

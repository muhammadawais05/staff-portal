import React, { useMemo } from 'react'
import { Container, Checkbox, Section, SkeletonLoader } from '@toptal/picasso'
import { ContainerLoader } from '@staff-portal/ui'

import { GetClientHierarchyQuery } from '../../data/get-client-hierarchy.staff.gql.types'
import ClientHierarchyAccordion from '../ClientHierarchyAccordion'

type Props = {
  initialLoading: boolean
  loading: boolean
  data: GetClientHierarchyQuery | undefined
  includeBadLeads: boolean

  onIncludeBadLeadsChange: (checked: boolean) => void
}

const ClientHierarchySection = ({
  initialLoading,
  loading,
  includeBadLeads,
  onIncludeBadLeadsChange,
  data: { node: client } = {}
}: Props) => {
  const allClients = client?.hierarchy?.clients.nodes

  const allClientsById = useMemo(
    () => new Map(allClients?.map(node => [node.id, node])),
    [allClients]
  )

  const rootClient = useMemo(
    () => allClients?.find(({ parent }) => !parent),
    [allClients]
  )

  const title = 'Account Name'

  const skeletonComponent = (
    <Section
      title={title}
      data-testid='client-hierarchy-section-skeleton'
      variant='withHeaderBar'
    >
      <SkeletonLoader.Typography rows={1} />
    </Section>
  )

  const actions = (
    <Container>
      <Checkbox
        label='Show Bad Leads'
        data-testid='show-bad-leads-checkbox'
        checked={includeBadLeads}
        onChange={(_, checked) => onIncludeBadLeadsChange(checked)}
      />
    </Container>
  )

  return (
    <ContainerLoader
      showSkeleton={initialLoading}
      loading={loading}
      skeletonComponent={skeletonComponent}
    >
      <Section
        title={title}
        data-testid='client-hierarchy-section'
        variant='withHeaderBar'
        actions={actions}
      >
        {rootClient && client && (
          <ClientHierarchyAccordion
            client={rootClient}
            allClientsById={allClientsById}
            markedClientId={client.id}
            isTopLevel
          />
        )}
      </Section>
    </ContainerLoader>
  )
}

export default ClientHierarchySection

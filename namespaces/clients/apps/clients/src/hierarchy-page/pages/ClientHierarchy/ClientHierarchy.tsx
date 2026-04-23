import React, { useMemo, useState } from 'react'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { useGetClientRoleIdParam } from '@staff-portal/clients'

import { useGetClientHierarchy } from '../../data/get-client-hierarchy.staff.gql'
import ClientHierarchySection from '../../components/ClientHierarchySection'

const ClientHierarchy = () => {
  const [includeBadLeads, setIncludeBadLeads] = useState(false)
  const { clientId } = useGetClientRoleIdParam()

  const { initialLoading, loading, data } = useGetClientHierarchy(
    clientId,
    includeBadLeads
  )

  const client = data?.node

  const headline = useMemo(() => {
    if (!client) {
      return undefined
    }

    const rootClient = client.hierarchy?.clients.nodes.find(
      ({ parent }) => !parent
    )

    if (!rootClient || rootClient.id === client.id) {
      return client.fullName
    }

    return `${rootClient.webResource.text} » ${client.fullName}`
  }, [client])

  return (
    <ContentWrapper
      browserTitle={
        client ? `Client hierarchy for ${client.fullName}` : undefined
      }
      tooltipDisabled
      titleLoading={initialLoading}
      title={headline}
    >
      <ClientHierarchySection
        initialLoading={initialLoading}
        loading={loading}
        data={data}
        includeBadLeads={includeBadLeads}
        onIncludeBadLeadsChange={setIncludeBadLeads}
      />
    </ContentWrapper>
  )
}

export default ClientHierarchy

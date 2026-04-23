import React, { useMemo } from 'react'
import { Accordion, Tag, Container } from '@toptal/picasso'
import { WebResourceLink } from '@staff-portal/ui'

import { ClientHierarchyItemFragment } from '../../data/get-client-hierarchy.staff.gql.types'
import * as S from './styles'

type Props = {
  client: ClientHierarchyItemFragment
  allClientsById: Map<string, ClientHierarchyItemFragment>
  markedClientId: string
  isTopLevel?: boolean
}

const ClientHierarchyAccordion = ({
  client: {
    id,
    webResource: { url, text },
    children
  },
  allClientsById,
  markedClientId,
  isTopLevel
}: Props) => {
  const childClients = useMemo(() => {
    if (!children) {
      return undefined
    }

    const clients = children.nodes
      .map(({ id: childId }) => allClientsById.get(childId))
      // children contains all children, grandchildren, and so on, so we filter to get only direct children
      // in theory we could construct the tree without querying children because we have a parent in every node
      // but backend returns children in a specific order that would get messed up then
      // so we query the ids of the children to respect the order and match platform version of this page
      .filter(
        child => child?.parent?.id === id
      ) as ClientHierarchyItemFragment[] // we know items are not nullable because of the filter

    // node with markedClientId always comes first within parent
    return clients.sort(({ id: childId1 }, { id: childId2 }) =>
      childId1 === markedClientId ? -1 : childId2 === markedClientId ? 1 : 0
    )
  }, [children, id, allClientsById, markedClientId])

  return (
    <Accordion
      data-testid='client-hierarchy-accordion'
      expandIcon={childClients?.length ? undefined : <span />}
      expanded
      css={isTopLevel ? undefined : S.indent}
      content={
        <Container css={S.container}>
          {childClients?.map(client => (
            <ClientHierarchyAccordion
              key={client.id}
              client={client}
              allClientsById={allClientsById}
              markedClientId={markedClientId}
            />
          ))}
        </Container>
      }
    >
      <Accordion.Summary>
        <WebResourceLink link={{ url, text }} />

        {id === markedClientId && (
          <Container inline left='xsmall'>
            <Tag.Rectangular variant='light-grey'>CURRENT</Tag.Rectangular>
          </Container>
        )}
      </Accordion.Summary>
    </Accordion>
  )
}

export default ClientHierarchyAccordion

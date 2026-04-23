import React from 'react'
import {
  BoundFunctions,
  render,
  screen,
  within
} from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { queries } from '@testing-library/dom'

import { ClientHierarchyItemFragment } from '../../data/get-client-hierarchy.staff.gql.types'
import ClientHierarchyAccordion from '../ClientHierarchyAccordion'

const createMockClient = (
  id: string,
  parentId: string | null,
  childIds?: string[]
): ClientHierarchyItemFragment => ({
  id,
  parent: parentId ? { id: parentId } : null,
  webResource: { url: `https://${id}.com`, text: 'Name of ' + id },
  children: childIds
    ? { nodes: childIds.map(childId => ({ id: childId })) }
    : null
})

const renderComponent = () => {
  const root = createMockClient('root', null, [
    'child1',
    'child2',
    'grandChild'
  ])
  const child1 = createMockClient('child1', 'root', ['grandChild'])
  const child2 = createMockClient('child2', 'root')
  const grandChild = createMockClient('grandChild', 'child1')

  const allClientsById = new Map(
    [root, child1, child2, grandChild].map(client => [client.id, client])
  )

  return render(
    <TestWrapper>
      <ClientHierarchyAccordion
        client={root}
        allClientsById={allClientsById}
        markedClientId={child1.id}
      />
    </TestWrapper>
  )
}

const getAccordionByLabel = (
  querySource: BoundFunctions<typeof queries>,
  label: string
) =>
  querySource
    .getByText(label)
    .closest('[data-testid="client-hierarchy-accordion"]') as HTMLElement

describe('ClientHierarchy', () => {
  it('renders clients in the correct hierarchical order', () => {
    renderComponent()

    const root = getAccordionByLabel(screen, 'Name of root')
    const child1 = getAccordionByLabel(within(root), 'Name of child1')
    const child2 = getAccordionByLabel(within(root), 'Name of child2')
    const grandChild = getAccordionByLabel(within(child1), 'Name of grandChild')

    expect(root).toBeInTheDocument()
    expect(child1).toBeInTheDocument()
    expect(child2).toBeInTheDocument()
    expect(grandChild).toBeInTheDocument()
  })

  it('links the client names correctly', () => {
    renderComponent()

    expect(screen.getByText('Name of root').closest('a')).toHaveAttribute(
      'href',
      'https://root.com'
    )

    expect(screen.getByText('Name of child1').closest('a')).toHaveAttribute(
      'href',
      'https://child1.com'
    )

    expect(screen.getByText('Name of child2').closest('a')).toHaveAttribute(
      'href',
      'https://child2.com'
    )

    expect(screen.getByText('Name of grandChild').closest('a')).toHaveAttribute(
      'href',
      'https://grandChild.com'
    )
  })

  it('marks the correct client with the "CURRENT" label', () => {
    renderComponent()

    expect(
      within(getAccordionByLabel(screen, 'Name of child1')).getByText('CURRENT')
    ).toBeInTheDocument()

    expect(
      within(getAccordionByLabel(screen, 'Name of child2')).queryByText(
        'CURRENT'
      )
    ).not.toBeInTheDocument()
  })
})

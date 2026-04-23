import React from 'react'
import { screen, render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent } from '@testing-library/react'

import {
  ClientHierarchyItemFragment,
  GetClientHierarchyQuery
} from '../../data/get-client-hierarchy.staff.gql.types'
import ClientHierarchySection from './ClientHierarchySection'
import ClientHierarchyAccordion from '../ClientHierarchyAccordion'

type ClientHierarchySectionProps = React.ComponentProps<
  typeof ClientHierarchySection
>
type ClientHierarchyAccordionProps = React.ComponentProps<
  typeof ClientHierarchyAccordion
>

jest.mock('../ClientHierarchyAccordion')
const MockClientHierarchyAccordion = ClientHierarchyAccordion as jest.Mock

const root: ClientHierarchyItemFragment = {
  id: 'mock-client-id',
  webResource: {
    text: 'Client'
  },
  children: {
    nodes: [{ id: 'mock-child-client-id' }]
  }
}

const child: ClientHierarchyItemFragment = {
  id: 'mock-child-client-id',
  webResource: {
    text: 'Child'
  },
  parent: {
    id: 'mock-client-id'
  },
  badLead: true
}

const mockData: GetClientHierarchyQuery = {
  node: {
    id: 'mock-client-id',
    fullName: 'Mock Client Name',
    hierarchy: {
      clients: {
        nodes: [root, child]
      }
    }
  }
}

const renderComponent = ({
  initialLoading = false,
  loading = false,
  data = undefined,
  includeBadLeads = false,
  onIncludeBadLeadsChange = () => {}
}: Partial<ClientHierarchySectionProps>) => {
  MockClientHierarchyAccordion.mockReturnValue(null)

  return render(
    <TestWrapper>
      <ClientHierarchySection
        initialLoading={initialLoading}
        loading={loading}
        data={data}
        includeBadLeads={includeBadLeads}
        onIncludeBadLeadsChange={onIncludeBadLeadsChange}
      />
    </TestWrapper>
  )
}

describe('ClientHierarchySection', () => {
  describe('when data is initially loading', () => {
    it('renders title with loader during initial loading', () => {
      renderComponent({ initialLoading: true })

      expect(screen.getByText('Account Name')).toBeInTheDocument()

      expect(
        screen.getByTestId('client-hierarchy-section-skeleton')
      ).toBeInTheDocument()

      expect(
        screen.queryByTestId('client-hierarchy-section')
      ).not.toBeInTheDocument()
    })
  })

  describe('when data is loaded', () => {
    it('renders ClientHierarchyAccordion component with expected props', () => {
      renderComponent({ data: mockData })

      expect(screen.getByText('Account Name')).toBeInTheDocument()

      const expectedProps: Partial<ClientHierarchyAccordionProps> = {
        client: root,
        markedClientId: 'mock-client-id',
        allClientsById: new Map([
          [root.id, root],
          [child.id, child]
        ])
      }

      expect(ClientHierarchyAccordion).toHaveBeenCalledWith(
        expect.objectContaining(expectedProps),
        {}
      )
    })
  })

  describe('"Include bad leads" checkbox', () => {
    const getBadLeadsCheckbox = () =>
      screen.getByRole('checkbox', { name: 'Show Bad Leads' })

    it('is unchecked if includeBadLeads flag is not set', () => {
      renderComponent({})

      expect(getBadLeadsCheckbox()).not.toBeChecked()
    })

    it('is checked if includeBadLeads flag is set', () => {
      renderComponent({ includeBadLeads: true })

      expect(getBadLeadsCheckbox()).toBeChecked()
    })

    it('triggers callback on checkbox check', () => {
      const onIncludeBadLeadsChange = jest.fn()

      renderComponent({ onIncludeBadLeadsChange })

      fireEvent.click(getBadLeadsCheckbox())

      expect(onIncludeBadLeadsChange).toHaveBeenCalledTimes(1)
      expect(onIncludeBadLeadsChange).toHaveBeenCalledWith(true)
    })
  })
})

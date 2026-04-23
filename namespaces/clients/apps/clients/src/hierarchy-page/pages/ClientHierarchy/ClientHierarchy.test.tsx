import React, { ComponentProps, PropsWithChildren } from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import { useGetClientHierarchy } from '../../data/get-client-hierarchy.staff.gql'
import { GetClientHierarchyQuery } from '../../data/get-client-hierarchy.staff.gql.types'
import ClientHierarchySection from '../../components/ClientHierarchySection'
import ClientHierarchy from '.'

jest.mock('@staff-portal/page-wrapper', () => ({
  ...jest.requireActual('@staff-portal/page-wrapper'),
  ContentWrapper: jest.fn()
}))
const MockContentWrapper = ContentWrapper as jest.Mock

jest.mock('../../components/ClientHierarchySection')
const MockClientHierarchySection = ClientHierarchySection as jest.Mock

jest.mock('../../data/get-client-hierarchy.staff.gql')
const mockUseGetClientHierarchy = useGetClientHierarchy as jest.Mock

jest.mock('@staff-portal/clients', () => ({
  ...jest.requireActual('@staff-portal/clients'),
  useGetClientRoleIdParam: () => ({ clientId: 'mock-client-id' })
}))

const renderComponent = ({
  initialLoading = false,
  loading = false,
  data
}: {
  initialLoading?: boolean
  loading?: boolean
  data?: GetClientHierarchyQuery
}) => {
  mockUseGetClientHierarchy.mockReturnValue({ initialLoading, loading, data })

  render(<ClientHierarchy />)
}

describe('ClientHierarchy', () => {
  const mockClient = {
    id: 'mock-client-id',
    fullName: 'Fancy Company'
  }

  beforeEach(() => {
    MockContentWrapper.mockImplementation(
      ({ children }: PropsWithChildren<unknown>) => <>{children}</>
    )

    MockClientHierarchySection.mockImplementation(
      ({
        onIncludeBadLeadsChange
      }: Pick<
        ComponentProps<typeof ClientHierarchySection>,
        'onIncludeBadLeadsChange'
      >) => (
        <div
          data-testid='mock-include-bad-leads'
          onClick={() => onIncludeBadLeadsChange(true)}
        />
      )
    )
  })

  it('calls useGetClientHierarchy with the correct parameters', () => {
    renderComponent({})

    expect(mockUseGetClientHierarchy).toHaveBeenCalledWith(
      'mock-client-id',
      false
    )
  })

  describe('when data is loading', () => {
    it('passes correct props to ContentWrapper', () => {
      renderComponent({ initialLoading: true, loading: true })

      const expectedProps: Partial<
        React.ComponentProps<typeof ContentWrapper>
      > = { titleLoading: true }

      expect(MockContentWrapper).toHaveBeenCalledWith(
        expect.objectContaining(expectedProps),
        {}
      )
    })

    it('passes correct props to ClientHierarchySection', () => {
      renderComponent({ initialLoading: true, loading: true })

      const expectedProps: Partial<
        React.ComponentProps<typeof ClientHierarchySection>
      > = {
        initialLoading: true,
        loading: true,
        data: undefined
      }

      expect(MockClientHierarchySection).toHaveBeenCalledWith(
        expect.objectContaining(expectedProps),
        {}
      )
    })
  })

  describe('when data is loaded', () => {
    it('passes correct props to ContentWrapper', () => {
      renderComponent({ data: { node: mockClient } })

      const expectedProps: Partial<
        React.ComponentProps<typeof ContentWrapper>
      > = {
        titleLoading: false,
        title: 'Fancy Company',
        browserTitle: 'Client hierarchy for Fancy Company'
      }

      expect(MockContentWrapper).toHaveBeenCalledWith(
        expect.objectContaining(expectedProps),
        {}
      )
    })

    it('passes correct props to ClientHierarchySection', () => {
      const data = { node: mockClient }

      renderComponent({ data })

      const expectedProps: Partial<
        React.ComponentProps<typeof ClientHierarchySection>
      > = {
        initialLoading: false,
        loading: false,
        includeBadLeads: false,
        data
      }

      expect(MockClientHierarchySection).toHaveBeenCalledWith(
        expect.objectContaining(expectedProps),
        {}
      )
    })
  })

  describe('When includeBadLeads is selected', () => {
    it('passes includeBadLeads flag to ClientHierarchySection', () => {
      renderComponent({})
      jest.clearAllMocks()

      fireEvent.click(screen.getByTestId('mock-include-bad-leads'))

      const expectedProps: Partial<
        ComponentProps<typeof ClientHierarchySection>
      > = { includeBadLeads: true }

      expect(MockClientHierarchySection).toHaveBeenCalledWith(
        expect.objectContaining(expectedProps),
        {}
      )
    })

    it('refetches query with includeBadLeads flag', () => {
      renderComponent({})
      jest.clearAllMocks()

      fireEvent.click(screen.getByTestId('mock-include-bad-leads'))

      expect(mockUseGetClientHierarchy).toHaveBeenCalledWith(
        'mock-client-id',
        true
      )
    })
  })
})

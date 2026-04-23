import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { PerformedActionsList } from '../../../../components'
import { useGetPermissions } from '../../data/get-permissions/get-permissions.staff.gql'
import EntityGlobalPerformedActionsList from './EntityGlobalPerformedActionsList'

jest.mock('@staff-portal/error-handling', () => ({
  ...jest.requireActual('@staff-portal/error-handling'),
  ErrorView: () => <div data-testid='error-view' />
}))

jest.mock('../../../../components', () => ({
  ...jest.requireActual('../../../../components'),
  PerformedActionsContentWrapper: ({ children }: { children: ReactNode }) => (
    <div data-testid='performed-actions-content-wrapper'>{children}</div>
  ),
  PerformedActionsList: jest.fn()
}))

jest.mock('../../data/get-permissions/get-permissions.staff.gql')

// unmock to test for error view
jest.unmock('@staff-portal/page-wrapper')

const mockPerformedActionsList = PerformedActionsList as jest.Mock
const mockUseGetPermissions = useGetPermissions as jest.Mock

const arrangeTest = ({
  canView,
  loading,
  error
}: {
  canView: boolean
  loading: boolean
  error?: unknown
}) => {
  mockUseGetPermissions.mockImplementation(() => ({
    canView,
    loading,
    error
  }))

  mockPerformedActionsList.mockImplementation(() => (
    <div data-testid='performed-actions-list' />
  ))

  render(
    <TestWrapper>
      <EntityGlobalPerformedActionsList
        entityType='vertical'
        titleEntityName='Vertical'
        permissionFieldName='canViewVerticalHistory'
      />
    </TestWrapper>
  )
}

describe('EntityGlobalPerformedActionsList', () => {
  describe('when entity data is loading', () => {
    it('renders content wrapper', () => {
      arrangeTest({ canView: false, loading: true })

      expect(screen.queryByTestId('error-view')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('performed-actions-content-wrapper')
      ).toBeInTheDocument()
    })
  })

  describe('when permission was fetched and data can be viewed', () => {
    it('renders content wrapper', () => {
      arrangeTest({
        canView: true,
        loading: false
      })

      expect(screen.queryByTestId('error-view')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('performed-actions-content-wrapper')
      ).toBeInTheDocument()
    })
  })

  describe('when permission was fetched and data cannot be viewed', () => {
    it('renders error view', () => {
      arrangeTest({
        canView: false,
        loading: false
      })

      expect(screen.queryByTestId('error-view')).toBeInTheDocument()
      expect(
        screen.queryByTestId('performed-actions-content-wrapper')
      ).not.toBeInTheDocument()
    })
  })

  describe('when data fetch results in an error and cannot be viewed', () => {
    it('renders error view', () => {
      arrangeTest({
        canView: false,
        loading: false,
        error: {}
      })

      expect(screen.queryByTestId('error-view')).toBeInTheDocument()
      expect(
        screen.queryByTestId('performed-actions-content-wrapper')
      ).not.toBeInTheDocument()
    })
  })
})

import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import EntityPerformedActionsList from './EntityPerformedActionsList'
import { useGetPerformedActionEntityData } from './hooks'
import { PerformedActionEntityLink, PerformedActionEntityData } from './types'
import { PerformedActionsList } from '../../components'

jest.mock('@staff-portal/error-handling', () => ({
  ...jest.requireActual('@staff-portal/error-handling'),
  ErrorView: () => <div data-testid='error-view' />
}))

jest.mock('./hooks', () => ({
  ...jest.requireActual('./hooks'),
  useGetPerformedActionEntityData: jest.fn()
}))

jest.mock('../../components', () => ({
  ...jest.requireActual('../../components'),
  PerformedActionsContentWrapper: ({ children }: { children: ReactNode }) => (
    <div data-testid='performed-actions-content-wrapper'>{children}</div>
  ),
  PerformedActionsList: jest.fn()
}))

const useGetPerformedActionEntityDataMock =
  useGetPerformedActionEntityData as jest.Mock
const PerformedActionsListMock = PerformedActionsList as jest.Mock

const arrangeTest = ({
  viewerCanViewHistory,
  entityData,
  loading,
  useGetSearchData,
  useGetFilters
}: {
  viewerCanViewHistory: boolean
  entityData?: PerformedActionEntityLink
  loading: boolean
  useGetSearchData?: PerformedActionEntityData['useGetSearchData']
  useGetFilters?: PerformedActionEntityData['useGetFilters']
}) => {
  useGetPerformedActionEntityDataMock.mockImplementation(() => ({
    viewerCanViewHistory,
    entityData,
    loading
  }))
  PerformedActionsListMock.mockImplementation(() => (
    <div data-testid='performed-actions-list' />
  ))

  render(
    <TestWrapper>
      <EntityPerformedActionsList
        entityType='Talent'
        entityId={encodeEntityId('123', 'Engagement')}
        useGetSearchData={useGetSearchData}
        useGetFilters={useGetFilters}
        decodedEntityId='123'
      />
    </TestWrapper>
  )
}

describe('EntityPerformedActionsList', () => {
  describe('when entity data is loading', () => {
    it('renders content wrapper', () => {
      arrangeTest({ viewerCanViewHistory: false, loading: true })

      expect(screen.queryByTestId('error-view')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('performed-actions-content-wrapper')
      ).toBeInTheDocument()
    })
  })

  describe('when entity data was fetched and can be viewed', () => {
    it('renders content wrapper', () => {
      arrangeTest({
        viewerCanViewHistory: true,
        entityData: {
          text: 'text',
          url: 'url'
        },
        loading: false
      })

      expect(screen.queryByTestId('error-view')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('performed-actions-content-wrapper')
      ).toBeInTheDocument()
    })

    describe('when `getFilters` function is passed', () => {
      it('renders filters component', () => {
        arrangeTest({
          viewerCanViewHistory: true,
          entityData: {
            text: 'text',
            url: 'url'
          },
          loading: false,
          useGetFilters: () => ({
            component: <div data-testid='history-filters' />,
            searchVariables: {
              feeds: [['foo-action']]
            }
          })
        })

        expect(screen.getByTestId('history-filters')).toBeInTheDocument()
      })

      it('calls history list component with filter search variables', () => {
        arrangeTest({
          viewerCanViewHistory: true,
          entityData: {
            text: 'text',
            url: 'url'
          },
          loading: false,
          useGetFilters: () => ({
            component: <div data-testid='history-filters' />,
            searchVariables: {
              feeds: [['foo-action']]
            }
          })
        })

        expect(PerformedActionsListMock).toHaveBeenCalledWith(
          expect.objectContaining({
            feeds: [['gid://platform/Talent/123'], ['foo-action']]
          }),
          {}
        )
      })
    })

    describe('when `getFilters` function is not passed', () => {
      it('does not render filters component', () => {
        arrangeTest({
          viewerCanViewHistory: true,
          entityData: {
            text: 'text',
            url: 'url'
          },
          loading: false
        })

        expect(screen.queryByTestId('history-filters')).not.toBeInTheDocument()
      })

      it('does not call history list component with filter search variables', () => {
        arrangeTest({
          viewerCanViewHistory: true,
          entityData: {
            text: 'text',
            url: 'url'
          },
          loading: false
        })

        expect(PerformedActionsListMock).not.toHaveBeenCalledWith(
          expect.objectContaining({
            feeds: [['foo-action']]
          }),
          {}
        )
      })
    })
  })

  describe('when entity search data was not fetched', () => {
    it('renders error view', () => {
      arrangeTest({
        viewerCanViewHistory: true,
        entityData: {
          text: 'text',
          url: 'url'
        },
        loading: false,
        useGetSearchData: () => null
      })

      expect(screen.queryByTestId('error-view')).toBeInTheDocument()
      expect(
        screen.queryByTestId('performed-actions-content-wrapper')
      ).not.toBeInTheDocument()
    })
  })

  describe('when entity data was not fetched', () => {
    it('renders error view', () => {
      arrangeTest({
        viewerCanViewHistory: true,
        loading: false
      })

      expect(screen.queryByTestId('error-view')).toBeInTheDocument()
      expect(
        screen.queryByTestId('performed-actions-content-wrapper')
      ).not.toBeInTheDocument()
    })
  })

  describe('when entity data cannot be viewed', () => {
    it('renders error view', () => {
      arrangeTest({
        viewerCanViewHistory: false,
        entityData: {
          text: 'text',
          url: 'url'
        },
        loading: false
      })

      expect(screen.queryByTestId('error-view')).toBeInTheDocument()
      expect(
        screen.queryByTestId('performed-actions-content-wrapper')
      ).not.toBeInTheDocument()
    })
  })
})

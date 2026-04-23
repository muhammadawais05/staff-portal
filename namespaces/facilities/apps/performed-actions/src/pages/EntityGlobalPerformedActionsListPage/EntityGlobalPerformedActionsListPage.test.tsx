import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useParams } from '@staff-portal/navigation'
import { ErrorType, ErrorView } from '@staff-portal/error-handling'

import EntityGlobalPerformedActionsListPage from './EntityGlobalPerformedActionsListPage'
import {
  PerformedActionsRouterParams,
  PerformedActionPathEntityType
} from './types'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useParams: jest.fn()
}))

jest.mock('@staff-portal/error-handling', () => ({
  ...jest.requireActual('@staff-portal/error-handling'),
  ErrorView: jest.fn()
}))

jest.mock(
  './components/EntityGlobalPerformedActionsList/EntityGlobalPerformedActionsList',
  () => ({
    __esModule: true,
    default: () => <div data-testid='entity-performed-actions-list' />
  })
)

const useParamsMock = useParams as jest.Mock
const ErrorViewMock = ErrorView as jest.Mock

const arrangeTest = ({ entityType }: PerformedActionsRouterParams) => {
  useParamsMock.mockImplementation(() => ({
    entityType
  }))
  ErrorViewMock.mockImplementation(() => <div data-testid='error-view' />)

  render(
    <TestWrapper>
      <EntityGlobalPerformedActionsListPage />
    </TestWrapper>
  )
}

describe('EntityGlobalPerformedActionsListPage', () => {
  describe('when `entityType` is valid and supported', () => {
    const entityType = 'verticals'

    it('renders performed actions list', () => {
      arrangeTest({ entityType })

      expect(screen.queryByTestId('error-view')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('entity-performed-actions-list')
      ).toBeInTheDocument()
    })
  })

  describe('when `entityType` is invalid', () => {
    const entityType = 'abc' as PerformedActionPathEntityType

    it('redirects to legacy page', () => {
      arrangeTest({ entityType })

      expect(screen.queryByTestId('error-view')).toBeInTheDocument()
      expect(ErrorViewMock).toHaveBeenCalledWith(
        {
          errorType: ErrorType.NOT_FOUND
        },
        {}
      )

      expect(
        screen.queryByTestId('entity-performed-actions-list')
      ).not.toBeInTheDocument()
    })
  })
})

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useQueryParamsState } from '@staff-portal/query-params-state'

import PerformedActionsListExpandCommentsButton from './PerformedActionsListExpandCommentsButton'
import { PerformedActionsQueryParams } from '../../types'

jest.mock('@staff-portal/query-params-state', () => ({
  ...jest.requireActual('@staff-portal/query-params-state'),
  useQueryParamsState: jest.fn()
}))

const useQueryParamsStateMock = useQueryParamsState as jest.Mock

const arrangeTest = ({
  urlValues,
  setUrlValues
}: {
  urlValues: PerformedActionsQueryParams
  setUrlValues: (urlValues: PerformedActionsQueryParams) => void
}) => {
  useQueryParamsStateMock.mockImplementation(() => [urlValues, setUrlValues])

  render(
    <TestWrapper>
      <PerformedActionsListExpandCommentsButton />
    </TestWrapper>
  )
}

describe('PerformedActionsListExpandCommentsButton', () => {
  describe('when url parameters have `comments` parameter with `true` value', () => {
    it('renders button with a valid label', () => {
      arrangeTest({ urlValues: { comments: true }, setUrlValues: jest.fn() })

      expect(screen.queryByText('Collapse Comments')).toBeInTheDocument()
    })
  })

  describe('when url parameters have `comments` parameter with `false` value', () => {
    it('renders button with a valid label', () => {
      arrangeTest({ urlValues: { comments: false }, setUrlValues: jest.fn() })

      expect(screen.queryByText('Expand Comments')).toBeInTheDocument()
    })
  })

  describe('when click on button', () => {
    it('calls `setUrlValues` handler', () => {
      const setUrlValuesMock = jest.fn()

      arrangeTest({
        urlValues: {
          comments: true,
          otherValue: 'abc'
        } as PerformedActionsQueryParams,
        setUrlValues: setUrlValuesMock
      })

      fireEvent.click(
        screen.getByTestId('performed-actions-list-expand-comments-button')
      )

      expect(setUrlValuesMock).toHaveBeenCalledTimes(1)
      expect(setUrlValuesMock).toHaveBeenCalledWith({
        comments: false,
        otherValue: 'abc'
      })
    })
  })
})

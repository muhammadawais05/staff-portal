import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'

import MemorandumListHeader from '.'

jest.mock('@staff-portal/billing/src/utils/graphql')
jest.mock('../../data')
jest.mock('@staff-portal/billing/src/components/InlineActionsSkeleton')

const render = () => renderComponent(<MemorandumListHeader />)

describe('MemorandumListHeader', () => {
  describe('when its loading', () => {
    it('renders loading', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: { operations: undefined },
        loading: true,
        initialLoading: false
      }))
      const { queryByTestId } = render()

      expect(queryByTestId('MemorandumListHeader-add-button')).toBeNull()
      expect(queryByTestId('LoaderOverlay')).not.toBeNull()
    })
  })

  describe('when its initialLoading', () => {
    it('renders skeleton', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: { operations: undefined },
        loading: false,
        initialLoading: true
      }))
      const { queryByTestId } = render()

      expect(queryByTestId('MemorandumListHeader-add-button')).toBeNull()
      expect(queryByTestId('InlineActionsSkeleton')).not.toBeNull()
    })
  })

  describe('when operation is missing', () => {
    it('does not render the button at all', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: { operations: undefined },
        loading: false,
        initialLoading: false
      }))
      const { queryByTestId } = render()
      const button = queryByTestId('MemorandumListHeader-add-button')

      expect(button).toBeNull()
    })
  })

  describe('when the operation is Enabled', () => {
    it('renders the Add Memorandum button with proper details', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: {
          addRoleMemorandum: {
            callable: OperationCallableTypes.ENABLED,
            messages: ['']
          }
        },
        loading: false,
        initialLoading: false
      }))
      const { getByTestId } = render()
      const button = getByTestId('MemorandumListHeader-add-button')

      expect(button).toBeEnabled()
      expect(button).toHaveTextContent('Add Memorandum')
    })
  })

  describe('when the operation is Disabled', () => {
    it('renders the Add Memorandum button as disabled', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: {
          addRoleMemorandum: {
            callable: OperationCallableTypes.DISABLED,
            messages: ['']
          }
        },
        loading: false,
        initialLoading: false
      }))
      const { getByTestId } = render()
      const button = getByTestId('MemorandumListHeader-add-button')

      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('when the operation is Hidden', () => {
    it('does not render the button at all', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: {
          addRoleMemorandum: {
            callable: OperationCallableTypes.HIDDEN,
            messages: ['']
          }
        },
        loading: false,
        initialLoading: false
      }))
      const { queryByTestId } = render()

      const button = queryByTestId('MemorandumListHeader-add-button')

      expect(button).toBeNull()
    })
  })
})

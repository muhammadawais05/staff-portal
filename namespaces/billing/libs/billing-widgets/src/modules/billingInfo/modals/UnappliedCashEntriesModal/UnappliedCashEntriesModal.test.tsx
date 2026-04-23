import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import UnappliedCashEntriesModal from '.'

jest.mock('./data', () => ({
  useGetUnappliedCashEntriesQuery: jest
    .fn()
    .mockReturnValueOnce({
      data: {},
      error: undefined,
      loading: true,
      initialLoading: true
    })
    .mockReturnValueOnce({
      data: {
        node: {
          unappliedCashEntries: {
            nodes: [
              {
                id: '123'
              }
            ]
          }
        }
      },
      error: undefined,
      loading: false,
      initialLoading: false
    })
    .mockReturnValue({
      data: {},
      error: undefined,
      loading: false,
      initialLoading: false
    })
}))

const render = () =>
  renderComponent(<UnappliedCashEntriesModal options={{ nodeId: '123' }} />)

describe('UnappliedCashEntriesModal', () => {
  it('handles loading properly', () => {
    const { getByTestId, queryByTestId } = render()

    expect(getByTestId('ModalSkeleton')).toBeInTheDocument()

    expect(queryByTestId('title')).not.toBeInTheDocument()
    expect(queryByTestId('subtitle')).not.toBeInTheDocument()
  })

  it('renders modal properly', () => {
    const { queryByTestId } = render()

    expect(queryByTestId('ModalSkeleton')).not.toBeInTheDocument()
    expect(queryByTestId('empty')).not.toBeInTheDocument()

    expect(queryByTestId('title')).toBeInTheDocument()
    expect(queryByTestId('subtitle')).toBeInTheDocument()
  })

  describe('when nodes is an empty array', () => {
    it('handles empty state', () => {
      const { queryByTestId } = render()

      expect(queryByTestId('ModalSkeleton')).not.toBeInTheDocument()

      expect(queryByTestId('title')).toBeInTheDocument()
      expect(queryByTestId('empty')).toBeInTheDocument()
      expect(queryByTestId('subtitle')).not.toBeInTheDocument()
    })
  })
})

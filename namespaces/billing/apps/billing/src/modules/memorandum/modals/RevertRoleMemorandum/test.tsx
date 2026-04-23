import React, { ComponentProps } from 'react'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import RevertRoleMemorandum from '.'

jest.mock('@staff-portal/billing/src/utils/graphql')

jest.mock('../../../commercialDocument/components/RevertMemorandumForm')

jest.mock('./data', () => ({
  useRevertRoleMemorandumMutation: () => [jest.fn()]
}))

const render = (props: ComponentProps<typeof RevertRoleMemorandum>) =>
  renderComponent(<RevertRoleMemorandum {...props} />)

const mockGetNode = useGetNode as jest.Mock

describe('RevertRoleMemorandum', () => {
  it('default render', () => {
    mockGetNode.mockReturnValue(() => ({
      data: { node: fixtures.MockMemorandum },
      error: undefined,
      loading: false,
      initialLoading: false
    }))

    const { queryByTestId } = render({
      options: {
        nodeId: '123',
        nodeType: 'memorandum'
      }
    })

    expect(queryByTestId('RevertMemorandumForm')).toBeInTheDocument()
  })

  it('loading render', () => {
    mockGetNode.mockReturnValue(() => ({
      data: {},
      error: undefined,
      loading: true,
      initialLoading: true
    }))

    const { queryByTestId } = render({
      options: {
        nodeId: '123',
        nodeType: 'memorandum'
      }
    })

    expect(queryByTestId('ModalSkeleton')).toBeInTheDocument()
  })
})

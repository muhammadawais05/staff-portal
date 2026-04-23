import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import fixtures from '@staff-portal/billing/src/_fixtures'

import ChangeRoleReferrerModal from '.'

const mockedHandleOnRootLevelError = jest.fn()
const mockedHandleOnSuccess = jest.fn()

jest.mock('@staff-portal/billing/src/utils/graphql')

jest.mock('../ChangeRoleReferrerModalForm')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: mockedHandleOnRootLevelError,
    handleOnSuccess: mockedHandleOnSuccess
  })
)

jest.mock('../../data/setChangeRoleReferrer.graphql.types', () => ({
  useChangeRoleReferrerMutation: jest.fn(() => ['exampleSubmit'])
}))
jest.mock('../../data/setResetRoleReferrer.graphql.types', () => ({
  useResetRoleReferrerMutation: () => [jest.fn()]
}))
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

const render = (props: ComponentProps<typeof ChangeRoleReferrerModal>) =>
  renderComponent(<ChangeRoleReferrerModal {...props} />)

const data = fixtures.MockGetCommission

describe('ChangeRoleReferrerModal', () => {
  it('default render', () => {
    ;(useGetNode as jest.Mock).mockReturnValue(() => ({
      error: null,
      loading: false,
      initialLoading: false,
      data
    }))
    const { getByTestId } = render({
      options: {
        nodeId: '491023',
        nodeType: 'client'
      }
    })

    expect(getByTestId('ChangeRoleReferrerModalForm')).toBeInTheDocument()
  })
})

import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WriteOffModal from '.'

const mockedHandleOnRootLevelError = jest.fn()
const mockedHandleOnSuccess = jest.fn()

jest.mock('../WriteOffModalForm')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: mockedHandleOnRootLevelError,
    handleOnSuccess: mockedHandleOnSuccess
  })
)
jest.mock('./data/setWriteOffInvoice.graphql.types', () => ({
  useSetWriteOffInvoiceMutation: jest.fn(() => ['exampleSubmit'])
}))
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

const render = (props: ComponentProps<typeof WriteOffModal>) =>
  renderComponent(<WriteOffModal {...props} />)

describe('WriteOffModal', () => {
  it('default render', () => {
    const { container } = render({
      options: {
        nodeId: '1234'
      }
    })

    expect(container).toMatchSnapshot()
  })
})

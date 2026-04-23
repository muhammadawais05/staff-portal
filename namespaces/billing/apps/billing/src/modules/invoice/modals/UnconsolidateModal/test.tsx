import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import UnconsolidateModal from '.'

const mockedHandleOnRootLevelError = jest.fn()
const mockedHandleOnSuccess = jest.fn()

jest.mock('../UnconsolidateModalForm')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: mockedHandleOnRootLevelError,
    handleOnSuccess: mockedHandleOnSuccess
  })
)
jest.mock('./data/setUnconsolidateInvoice.graphql.types', () => ({
  useSetUnconsolidateInvoiceMutation: jest.fn(() => ['exampleSubmit'])
}))
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

const render = (props: ComponentProps<typeof UnconsolidateModal>) =>
  renderComponent(<UnconsolidateModal {...props} />)

describe('UnconsolidateModal', () => {
  it('default render', () => {
    const { getByTestId } = render({
      options: {
        nodeId: fixtures.MockInvoice.documentNumber.toString()
      }
    })

    expect(getByTestId('UnconsolidateModalForm')).toContainHTML(
      '{"initialValues":{"comment":"","invoiceId":"VjEtSW52b2ljZS0zNzcyNDk"},"documentNumber":"377249"}'
    )
  })
})

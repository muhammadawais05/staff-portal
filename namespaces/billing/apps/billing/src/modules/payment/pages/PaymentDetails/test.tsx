import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { StaffPortalRelatedTasks } from '@staff-portal/billing/src/@types/types'
import { useDependency } from '@staff-portal/dependency-injector'
import { when } from 'jest-when'

import { RELATED_TASKS } from '../../../../dependencies'
import PaymentDetails from '.'

jest.mock('../../../transfer/components/TableWrapper')
jest.mock('../../../notable/components/NotesList')
jest.mock('../../components/PaymentDetailsTable')
jest.mock('../../components/PaymentDetailsPageHeader')
jest.mock('../../../commercialDocument/components/Memorandums')
jest.mock('../../../notifications/components/EmailStatusPanel')

jest.mock('@staff-portal/dependency-injector', () => ({
  ...jest.requireActual('@staff-portal/dependency-injector'),
  useDependency: jest.fn()
}))

const MockedRelatedTasks: StaffPortalRelatedTasks = ({
  nodeId,
  taskSource
}) => (
  <div data-testid='RelatedTasks'>{JSON.stringify({ nodeId, taskSource })}</div>
)

when(useDependency as jest.Mock)
  .calledWith(RELATED_TASKS)
  .mockReturnValue(MockedRelatedTasks)

const render = (props: ComponentProps<typeof PaymentDetails>) =>
  renderComponent(<PaymentDetails {...props} />)

describe('PaymentDetails', () => {
  it('default render', () => {
    const { getByTestId } = render({
      paymentId: 'VjEtUGF5bWVudC0xMTA0NDI4'
    })

    expect(getByTestId('content-title')).toContainHTML(
      'Notice of Payment #1104428'
    )
    expect(getByTestId('PaymentDetailsPageHeader')).toContainHTML(
      '"paymentId":"VjEtUGF5bWVudC0xMTA0NDI4"'
    )
    expect(getByTestId('EmailStatusPanel')).toContainHTML(
      'VjEtUGF5bWVudC0xMTA0NDI4'
    )
    expect(getByTestId('NotesList')).toContainHTML('VjEtUGF5bWVudC0xMTA0NDI4')
    expect(getByTestId('RelatedTasks')).toContainHTML(
      '{"nodeId":"VjEtUGF5bWVudC0xMTA0NDI4","taskSource":"RELATED_TASKS_PAYMENT"}'
    )
    expect(getByTestId('Memorandums')).toContainHTML(
      '"commercialDocumentId":"VjEtUGF5bWVudC0xMTA0NDI4"'
    )
    expect(getByTestId('Transfers')).toContainHTML(
      '"nodeId":"VjEtUGF5bWVudC0xMTA0NDI4"'
    )
    expect(getByTestId('PaymentDetailsTable')).toContainHTML(
      '"paymentId":"VjEtUGF5bWVudC0xMTA0NDI4"'
    )
  })
})

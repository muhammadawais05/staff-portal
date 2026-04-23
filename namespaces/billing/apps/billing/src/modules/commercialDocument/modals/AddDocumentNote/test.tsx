import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import AddDocumentNote from '.'

const mockedHandleOnRootLevelError = jest.fn()
const mockedHandleOnSuccess = jest.fn()

jest.mock('../../components/EditDocumentNoteForm')

jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: mockedHandleOnRootLevelError,
    handleOnSuccess: mockedHandleOnSuccess
  })
)
jest.mock('./data/addDocumentNote.graphql.types', () => ({
  useAddDocumentNoteMutation: jest.fn()
}))
const addDocumentNoteMutation = jest.requireMock(
  './data/addDocumentNote.graphql.types'
).useAddDocumentNoteMutation as jest.Mock

const render = (props: ComponentProps<typeof AddDocumentNote>) =>
  renderComponent(<AddDocumentNote {...props} />)

describe('AddDocumentNote', () => {
  beforeEach(() => {
    addDocumentNoteMutation.mockImplementation(() => ['exampleSubmit'])
  })

  it('default render', () => {
    const { container } = render({
      options: {
        nodeId: fixtures.MockInvoice.documentNumber.toString(),
        nodeType: 'invoice'
      }
    })

    expect(container).toMatchSnapshot()
  })
})

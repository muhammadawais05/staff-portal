import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EditDocumentNote from '.'
import { useGetDocumentNote } from './data'

const mockedHandleOnRootLevelError = jest.fn()
const mockedHandleOnSuccess = jest.fn()

jest.mock('./data')
jest.mock('../../components/EditDocumentNoteForm')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: mockedHandleOnRootLevelError,
    handleOnSuccess: mockedHandleOnSuccess
  })
)
jest.mock('./data/editDocumentNote.graphql.types', () => ({
  useEditDocumentNoteMutation: jest.fn()
}))
const editDocumentNoteMutation = jest.requireMock(
  './data/editDocumentNote.graphql.types'
).useEditDocumentNoteMutation as jest.Mock

const render = (props: ComponentProps<typeof EditDocumentNote>) =>
  renderComponent(<EditDocumentNote {...props} />)

const mockGetDocumentNote = useGetDocumentNote as jest.Mock

describe('EditDocumentNote', () => {
  beforeEach(() => {
    editDocumentNoteMutation.mockImplementation(() => ['exampleSubmit'])
  })

  describe('`loading` is `true`', () => {
    beforeEach(() => {
      mockGetDocumentNote.mockReturnValue({
        data: {},
        loading: true
      })
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

  describe('`loading` is `false`', () => {
    beforeEach(() => {
      mockGetDocumentNote.mockReturnValue({
        data: { documentNote: 'testedit' },
        loading: false
      })
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
})

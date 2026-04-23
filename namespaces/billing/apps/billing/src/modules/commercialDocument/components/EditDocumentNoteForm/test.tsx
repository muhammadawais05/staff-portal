import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EditDocumentNoteForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = props =>
  renderComponent(
    <EditDocumentNoteForm
      handleOnSubmit={jest.fn()}
      nodeType='123456'
      {...props}
    />
  )

describe('EditDocumentNoteForm', () => {
  describe('`nodeType` is `invoice`', () => {
    describe('`isCreate` is `true`', () => {
      it('default render', () => {
        const { container } = render({
          nodeType: 'invoice',
          isCreate: true,
          initialValues: {
            commercialDocumentId: 'abc1234',
            note: ''
          }
        })

        expect(container).toMatchSnapshot()
      })
    })

    describe('`isCreate` is `false`', () => {
      it('default render', () => {
        const { container } = render({
          nodeType: 'invoice',
          isCreate: false,
          initialValues: {
            commercialDocumentId: 'abc1234',
            note: 'abc'
          }
        })

        expect(container).toMatchSnapshot()
      })
    })
  })

  describe('`nodeType` is `payment`', () => {
    describe('`isCreate` is `true`', () => {
      it('default render', () => {
        const { container } = render({
          nodeType: 'payment',
          isCreate: true,
          initialValues: {
            commercialDocumentId: 'abc1234',
            note: ''
          }
        })

        expect(container).toMatchSnapshot()
      })
    })

    describe('`isCreate` is `false`', () => {
      it('default render', () => {
        const { container } = render({
          nodeType: 'payment',
          isCreate: false,
          initialValues: {
            commercialDocumentId: 'abc1234',
            note: 'abc'
          }
        })

        expect(container).toMatchSnapshot()
      })
    })
  })
})

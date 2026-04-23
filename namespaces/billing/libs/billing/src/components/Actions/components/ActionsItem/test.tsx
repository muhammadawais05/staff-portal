import { getByTestId } from '@testing-library/dom'
import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import ActionsItem from '.'
import renderComponent from '../../../../utils/tests'

const render = (
  props: Omit<
    ComponentProps<typeof ActionsItem>,
    'handleOnClick' | 'documentNumber'
  >
) => {
  const extendedProps: ComponentProps<typeof ActionsItem> = {
    handleOnClick: jest.fn(),
    documentNumber: 123456,
    ...props
  }

  return renderComponent(<ActionsItem {...extendedProps} />)
}

describe('ActionsItem', () => {
  describe('when return null', () => {
    describe('when operation is "Hidden"', () => {
      it('default render', () => {
        const { queryByTestId } = render({
          operation: {
            callable: OperationCallableTypes.HIDDEN,
            messages: []
          },
          option: 'updateCommercialDocumentDueDate',
          isUrlAction: false
        })

        expect(queryByTestId('updateCommercialDocumentDueDate')).toBeFalsy()
      })
    })

    describe('when url is empty', () => {
      it('default render', () => {
        const { queryByTestId } = render({
          option: 'downloadPdfUrl',
          label: 'Download PDF',
          isUrlAction: true,
          href: undefined
        })

        expect(queryByTestId('downloadPdfUrl')).toBeFalsy()
      })
    })
  })

  describe('when url is not empty', () => {
    it('default render', () => {
      const { container } = render({
        option: 'downloadPdfUrl',
        label: 'Download PDF',
        isUrlAction: true,
        href: 'example.com/test'
      })

      expect(getByTestId(container, 'downloadPdfUrl')).toBeTruthy()
      expect(container).toMatchSnapshot()
    })
  })

  describe('when operation is "Disabled"', () => {
    it('default render', () => {
      const { container } = render({
        operation: {
          callable: OperationCallableTypes.DISABLED,
          messages: ['Test tooltip text']
        },
        option: 'updateCommercialDocumentDueDate',
        isUrlAction: false
      })

      expect(
        getByTestId(container, 'updateCommercialDocumentDueDate')
      ).toBeTruthy()
      expect(container).toMatchSnapshot()
    })
  })

  describe('when operation is "Enabled"', () => {
    it('default render', () => {
      const { container } = render({
        operation: {
          callable: OperationCallableTypes.ENABLED
        },
        option: 'updateCommercialDocumentDueDate',
        isUrlAction: false
      })

      expect(
        getByTestId(container, 'updateCommercialDocumentDueDate')
      ).toBeTruthy()
      expect(container).toMatchSnapshot()
    })
  })
})

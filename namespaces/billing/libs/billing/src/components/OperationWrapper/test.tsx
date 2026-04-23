import React, { ComponentProps } from 'react'
import { Button } from '@toptal/picasso'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import OperationWrapper from '.'
import renderComponent from '../../utils/tests'
import * as OperationHelpers from '../../_lib/helpers/operations'

const render = (props: ComponentProps<typeof OperationWrapper>) =>
  renderComponent(<OperationWrapper {...props} />)

const children = <Button data-testid='exampleButton'>Test</Button>

describe('OperationWrapper', () => {
  describe('when the operation is `undefined`', () => {
    it('return with `null`', () => {
      const { queryByTestId } = render({ children })

      expect(queryByTestId('example')).toBeNull()
    })
  })

  describe('when the operation is `Hidden`', () => {
    it('does not render tooltip & children', () => {
      const { queryByTestId } = render({
        children,
        operation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: ['test message', 'example message']
        }
      })

      expect(queryByTestId('Tooltip')).not.toBeInTheDocument()
      expect(queryByTestId('example')).not.toBeInTheDocument()
    })
  })

  describe('when the its in Loading state', () => {
    it('renders with disabled, as and loading props properly', () => {
      const { getByTestId, getByRole } = render({
        children,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        isLoading: true
      })
      const button = getByTestId('exampleButton')

      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-disabled', 'true')
      expect(getByRole('progressbar')).toBeInTheDocument()
    })
  })

  describe('when the its not in Loading state', () => {
    it('renders with disabled, as and loading props properly', () => {
      const { getByTestId, queryByRole } = render({
        children: <Button data-testid='exampleButton'>Test</Button>,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        isLoading: false
      })

      const button = getByTestId('exampleButton')

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
      expect(queryByRole('exampleButton-loading')).toBeNull()
    })
  })

  describe('when the child Button has href', () => {
    it('renders as a Link', () => {
      const { getByTestId, queryByRole } = render({
        children: (
          <Button data-testid='exampleButton' href='example.com/url'>
            Test
          </Button>
        ),
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        isLoading: false
      })

      const button = getByTestId('exampleButton')

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
      // Verify its a Link
      expect(button).toHaveClass('MuiLink-root')

      expect(queryByRole('exampleButton-loading')).toBeNull()
    })
  })

  describe('when its `Disabled`', () => {
    describe('when operation has messages', () => {
      it('renders with operation message', () => {
        const spy = jest
          .spyOn(OperationHelpers, 'getOperationMessage')
          .mockImplementation(() => 'test message')

        const { getByTestId } = render({
          children,
          operation: {
            callable: OperationCallableTypes.DISABLED,
            messages: ['test message', 'example message']
          }
        })
        const button = getByTestId('exampleButton')

        expect(getByTestId('Tooltip')).toBeInTheDocument()
        expect(getByTestId('Tooltip-placement')).toContainHTML('top')
        expect(getByTestId('Tooltip-content')).toContainHTML('test message')

        expect(button).toBeInTheDocument()
        expect(button).toHaveAttribute('aria-disabled', 'true')

        spy.mockRestore()
      })
    })

    describe('when operation has no messages', () => {
      it('renders with default text', () => {
        const { getByTestId } = render({
          children,
          disabledText: 'example disabled text',
          operation: {
            callable: OperationCallableTypes.DISABLED,
            messages: []
          }
        })
        const button = getByTestId('exampleButton')

        expect(getByTestId('Tooltip')).toBeInTheDocument()
        expect(getByTestId('Tooltip-placement')).toContainHTML('top')
        expect(getByTestId('Tooltip-content')).toContainHTML(
          'example disabled text'
        )

        expect(button).toBeInTheDocument()
        expect(button).toHaveAttribute('aria-disabled', 'true')
      })
    })
  })

  describe('when its `Enabled`', () => {
    describe('when default text provided', () => {
      it('renders tooltip', () => {
        const { getByTestId } = render({
          children,
          enabledText: 'example enabled tooltip',
          operation: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        })
        const button = getByTestId('exampleButton')

        expect(getByTestId('Tooltip')).toBeInTheDocument()
        expect(getByTestId('Tooltip-placement')).toContainHTML('top')
        expect(getByTestId('Tooltip-content')).toContainHTML(
          'example enabled tooltip'
        )

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })
    })

    describe('when no default text provided', () => {
      it('renders button', () => {
        const { getByTestId, queryByTestId } = render({
          children,
          operation: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        })
        const button = getByTestId('exampleButton')

        expect(queryByTestId('Tooltip')).toBeNull()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })
    })
  })
})

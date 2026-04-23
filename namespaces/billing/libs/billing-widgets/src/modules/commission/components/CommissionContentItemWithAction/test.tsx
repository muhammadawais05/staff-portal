import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { ModalKey } from '@staff-portal/billing/src/@types/types'

import CommissionContentItemWithAction from '.'

const render = (
  props: ComponentProps<typeof CommissionContentItemWithAction>
) => renderComponent(<CommissionContentItemWithAction {...props} />)

describe('CommissionContentItemWithAction', () => {
  describe('when `operation` is missing', () => {
    it('does not render the Button', () => {
      const { queryByTestId } = render({
        handleOnClick: jest.fn(),
        type: 'claimer'
      })

      expect(
        queryByTestId(
          `${CommissionContentItemWithAction.displayName}-claimer_action`
        )
      ).toBeNull()
      expect(
        queryByTestId(
          `${CommissionContentItemWithAction.displayName}-referrer_action`
        )
      ).toBeNull()
    })
  })

  describe('when `operation` is defined', () => {
    describe('when `type` is claimer', () => {
      it('renders the proper Button', () => {
        const { getByTestId, queryByTestId } = render({
          handleOnClick: jest.fn(),
          type: 'claimer',
          operation: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        })

        expect(
          getByTestId(
            `${CommissionContentItemWithAction.displayName}-claimer_action`
          )
        ).toHaveTextContent('Change')
        expect(
          getByTestId(
            `${CommissionContentItemWithAction.displayName}-claimer_action`
          )
        ).toHaveAttribute('data-value', ModalKey.clientClaimerUpdate)

        expect(
          queryByTestId(
            `${CommissionContentItemWithAction.displayName}-referrer_action`
          )
        ).toBeNull()
      })
    })

    describe('when `type` is referrer', () => {
      it('renders the proper Button', () => {
        const { getByTestId, queryByTestId } = render({
          handleOnClick: jest.fn(),
          type: 'referrer',
          operation: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        })

        expect(
          getByTestId(
            `${CommissionContentItemWithAction.displayName}-referrer_action`
          )
        ).toHaveTextContent('Change')
        expect(
          getByTestId(
            `${CommissionContentItemWithAction.displayName}-referrer_action`
          )
        ).toHaveAttribute('data-value', ModalKey.changeRoleReferrer)

        expect(
          queryByTestId(
            `${CommissionContentItemWithAction.displayName}-claimer_action`
          )
        ).toBeNull()
      })
    })
  })

  describe('when `webResource` is missing', () => {
    it('does not render the Link', () => {
      const { queryByTestId } = render({
        handleOnClick: jest.fn(),
        type: 'referrer',
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      })

      expect(
        queryByTestId(
          `${CommissionContentItemWithAction.displayName}-claimer_link`
        )
      ).toBeNull()
      expect(
        queryByTestId(
          `${CommissionContentItemWithAction.displayName}-referrer_link`
        )
      ).toBeNull()
    })
  })

  describe('when `webResource` is defined', () => {
    describe('when `type` is claimer', () => {
      it('renders the proper Link', () => {
        const { getByTestId, queryByTestId } = render({
          handleOnClick: jest.fn(),
          type: 'claimer',
          webResource: { url: 'example.com', text: 'Example Text' }
        })

        expect(
          getByTestId(
            `${CommissionContentItemWithAction.displayName}-claimer_link`
          )
        ).toHaveTextContent('Example Text')

        expect(
          queryByTestId(
            `${CommissionContentItemWithAction.displayName}-referrer_link`
          )
        ).toBeNull()
      })
    })

    describe('when `type` is referrer', () => {
      it('renders the proper Link', () => {
        const { getByTestId, queryByTestId } = render({
          handleOnClick: jest.fn(),
          type: 'referrer',
          webResource: { url: 'example.com', text: 'Example Text' }
        })

        expect(
          getByTestId(
            `${CommissionContentItemWithAction.displayName}-referrer_link`
          )
        ).toHaveTextContent('Example Text')

        expect(
          queryByTestId(
            `${CommissionContentItemWithAction.displayName}-claimer_link`
          )
        ).toBeNull()
      })
    })
  })
})

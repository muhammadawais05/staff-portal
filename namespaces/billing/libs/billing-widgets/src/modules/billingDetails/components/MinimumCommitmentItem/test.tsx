import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import MinimumCommitmentItem from './index'

const { displayName } = MinimumCommitmentItem

const render = (props: ComponentProps<typeof MinimumCommitmentItem>) =>
  renderComponent(<MinimumCommitmentItem {...props} />)

describe('MinimumCommitmentItem', () => {
  it('default render', () => {
    const { getByTestId } = render({
      clientId: '1',
      minimumHours: 5,
      operation: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    })

    expect(getByTestId(`${displayName}`)).toBeInTheDocument()
    expect(getByTestId(`${displayName}-label`)).toHaveTextContent(
      '5 hours per week'
    )
    expect(
      getByTestId(`${displayName}-minimum-commitment-edit`)
    ).toHaveTextContent('Edit')
  })

  describe('when hours is equal to one', () => {
    it('renders singular label', () => {
      const { getByTestId } = render({
        clientId: '1',
        minimumHours: 1,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      })

      expect(getByTestId(`${displayName}-label`)).toHaveTextContent(
        '1 hour per week'
      )
    })
  })

  describe('when hours is more than one', () => {
    it('renders plural label', () => {
      const { getByTestId } = render({
        clientId: '1',
        minimumHours: 5,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      })

      expect(getByTestId(`${displayName}-label`)).toHaveTextContent(
        '5 hours per week'
      )
    })
  })
})

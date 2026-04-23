import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import { render } from '@testing-library/react'
import { CallCounterpartyType } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { PurposesListItemFragment } from '../components/EditableCallPurposeCell/data/get-purposes-options/purposes-list-item-fragment.staff.gql.types'
import useCallPurposesOptions from './use-call-purposes-options'

const TestComponent = ({
  options
}: {
  options: PurposesListItemFragment[]
  initFormVal?: string
}) => {
  const [currentValue, optionsArr] = useCallPurposesOptions(options)

  return (
    <>
      <div data-testid='init-value'>{currentValue}</div>
      <div data-testid='formatted-options'>{JSON.stringify(optionsArr)}</div>
    </>
  )
}

const arrangeTest = (props: ComponentProps<typeof TestComponent>) =>
  render(
    <TestWrapper>
      <div data-testid='component-wrapper'>
        <Form
          onSubmit={() => {}}
          initialValues={{
            purpose: props.initFormVal
          }}
        >
          <TestComponent {...props} />
        </Form>
      </div>
    </TestWrapper>
  )

describe('useCallPurposesOptions', () => {
  describe('when call purposes is empty', () => {
    it('returns "other" select option', () => {
      const { getByTestId } = arrangeTest({
        options: []
      })

      expect(getByTestId('init-value')).toHaveTextContent('')
      expect(getByTestId('formatted-options')).toHaveTextContent(
        '[{"text":"Other","value":"other"}]'
      )
    })
  })

  describe('when call purposes data received', () => {
    it('returns selected value and formatting data to select options', () => {
      const { getByTestId } = arrangeTest({
        options: [
          {
            name: 'name#1',
            id: 'nodeId#1',
            counterpartyType: CallCounterpartyType.CLIENT,
            viewOrder: 1
          },
          {
            name: 'name#2',
            id: 'nodeId#2',
            counterpartyType: CallCounterpartyType.CLIENT,
            viewOrder: 2
          }
        ],
        initFormVal: 'name#2'
      })

      expect(getByTestId('init-value')).toHaveTextContent('nodeId#2')
      expect(getByTestId('formatted-options')).toHaveTextContent(
        '[{"text":"name#1","value":"nodeId#1"},{"text":"name#2","value":"nodeId#2"},{"text":"Other","value":"other"}]'
      )
    })
  })

  describe('when custom purpose is used', () => {
    it('returns selected value as "other"', () => {
      const { getByTestId } = arrangeTest({
        options: [
          {
            name: 'name#1',
            id: 'nodeId#1',
            counterpartyType: CallCounterpartyType.CLIENT,
            viewOrder: 1
          },
          {
            name: 'name#2',
            id: 'nodeId#2',
            counterpartyType: CallCounterpartyType.CLIENT,
            viewOrder: 2
          }
        ],
        initFormVal: 'other'
      })

      expect(getByTestId('init-value')).toHaveTextContent('other')
      expect(getByTestId('formatted-options')).toHaveTextContent(
        '[{"text":"name#1","value":"nodeId#1"},{"text":"name#2","value":"nodeId#2"},{"text":"Other","value":"other"}]'
      )
    })
  })
})

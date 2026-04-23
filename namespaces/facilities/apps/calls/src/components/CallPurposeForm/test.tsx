import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { CallCounterpartyType } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import CallPurposeForm from '.'

const arrangeTest = (
  props: ComponentProps<typeof CallPurposeForm> & { initFormVal?: string }
) => {
  window.Element.prototype.scrollIntoView = jest.fn()

  return render(
    <TestWrapper>
      <Form
        onSubmit={() => {}}
        initialValues={{
          purpose: props.initFormVal
        }}
      >
        <CallPurposeForm {...props} />
      </Form>
    </TestWrapper>
  )
}

describe('CallPurposeForm', () => {
  describe('rendering', () => {
    it('renders select input', () => {
      arrangeTest({
        value: '',
        name: 'purpose',
        disabled: false,
        onBlur: jest.fn(),
        onChange: jest.fn(),
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

      expect(screen.queryByTestId('text-input-purpose')).toBeNull()
      expect(screen.getByTestId('select-purpose')).toBeInTheDocument()
    })

    it('renders select input and text input', () => {
      arrangeTest({
        value: '',
        name: 'purpose',
        disabled: false,
        onBlur: jest.fn(),
        onChange: jest.fn(),
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

      expect(screen.getByTestId('text-input-purpose')).toBeInTheDocument()
      expect(screen.getByTestId('select-purpose')).toBeInTheDocument()
    })
  })

  it('validate if customPurpose exist', async () => {
    arrangeTest({
      value: '',
      name: 'purpose',
      disabled: false,
      onBlur: jest.fn(),
      onChange: jest.fn(),
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

    fireEvent.change(
      screen
        .getByTestId('text-input-purpose')
        .querySelector('input') as HTMLInputElement,
      {
        target: { value: '' }
      }
    )

    fireEvent.click(screen.getByTestId('button-input-purpose'))

    await act(() => Promise.resolve())

    expect(screen.getByText('Please complete this field.')).toBeInTheDocument()
  })
})
